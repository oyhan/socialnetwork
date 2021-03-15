using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.DomainObjects.User;
using Mahoor.Infrastructure;
using Mahoor.Services.Events;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Follow.Dto;
using Mahoor.Services.Graph.Events;
using Mahoor.Services.Helper;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Profile.Dto;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PSYCO.Common.Interfaces;
using SmartFormat;

namespace Mahoor.Services.User
{
    public class AppUserManager 
    {
        public string IpAddress { get; set; }
        private readonly AppSettings _appSettings;
        private readonly SignInManager<UserModel> _signInManager;
        private AppDbContext _context;
        private readonly ISmsSender _smsSender;
        private readonly IMediator _mediator;

        public UserManager<UserModel> UserManager => _signInManager.UserManager;

        public AppUserManager(
            SignInManager<UserModel> signInManager,
            AppDbContext context,
            IOptions<AppSettings> appSettings,
//            ISmsSender smsSender,
            IMediator mediator
            

            ) 
        {

            _appSettings = appSettings.Value;
            _signInManager = signInManager;
            _context = context;
//            _smsSender = smsSender;
            _mediator = mediator;
//            _signInManager = signInManager;
        }


        public async Task<List<FollowRequestDto>> GetUserFollowRequests(List<string> users)
        {
            return await UserManager.Users.Where(u => users.Contains(u.Id)).Select(u => u.ToFollowRequestModel())
                .ToListAsync();
        }


        public async Task<ProfileDto> GetUserProfile(string userId)
        {
            return (await UserManager.Users.FirstOrDefaultAsync(u => u.Id == userId)).ToProfileDtoModel();

        }
        public async Task<UserModel> FindByUsername(string username)
        {
            var user = await UserManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
            return user;
        }

        public async Task<UserModel> FindByPhoneNumberAsync(string phoneNumber)
        {
            var user =await UserManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            return user;
        }

        public async Task<BaseServiceResponse<RegisterReponse>> Register(RegisterUserCommand command)
        {
            var user = new UserModel()
            {
                UserName = command.Username,
                PhoneNumber =  command.PhoneNumber
            };
            var duplicateUser = await FindByPhoneNumberAsync(command.PhoneNumber);

            if (duplicateUser!=null)
            {
                return BaseServiceResponse<RegisterReponse>.FailedResponse("duplicate phone number");
            }
            var result = await UserManager.CreateAsync(user);
            if (result.Succeeded)
            {

                var token = await UserManager.GenerateChangePhoneNumberTokenAsync(user, user.PhoneNumber);
                await _mediator.Publish(new UserCreatedEvent() {UserId = user.Id});
                //todo check for when was the last time sms was sent
//                await _smsSender.SendSms(user.PhoneNumber, Smart.Format(_appSettings.SmsTokenMessage,new {token}));
                return BaseServiceResponse<RegisterReponse>.SuccessFullResponse(new RegisterReponse(true,user.Id));
            }
            return BaseServiceResponse<RegisterReponse>.FailedResponse(result.GetErrors());

        }

        public async Task<BaseServiceResponse<ConfirmPhoneNumberReponse>> ConfirmPhoneNumber(
            ConfirmPhoneNumberCommand command)
        {
            var user =await  FindByPhoneNumberAsync(command.MobileNumber);
            if (user==null)
            {
                return BaseServiceResponse<ConfirmPhoneNumberReponse>.FailedResponse("user not found");
            }

#if !DEBUG
            var confirmResult =await UserManager.VerifyChangePhoneNumberTokenAsync(user, command.Token, user.PhoneNumber);
            if (confirmResult)
#endif
            {
                user.PhoneNumberConfirmed = true;
                var refreshToken = generateRefreshToken(IpAddress);
                user.RefreshTokens.Add(refreshToken);
                var updateResult = await UserManager.UpdateAsync(user);

                if (updateResult.Succeeded)
                {
                    //generate token and refresh Token
                    var token = generateJwtToken(user);
                
                    return BaseServiceResponse<ConfirmPhoneNumberReponse>.SuccessFullResponse
                        (new ConfirmPhoneNumberReponse(){Token = token, RefreshToken=refreshToken.Token, User = ToUserDto(user)});
                }
                return BaseServiceResponse<ConfirmPhoneNumberReponse>.FailedResponse(updateResult.GetErrors());
            }
            return BaseServiceResponse<ConfirmPhoneNumberReponse>.FailedResponse("wrong confirmation code");
        }

        public async Task<BaseServiceResponse<AuthenticateResponse>> Authenticate(AuthenticateRequest model, string ipAddress)
        {
            var user = await UserManager.FindByNameAsync(model.Username);

            // return null if user not found
            if (user == null) return BaseServiceResponse<AuthenticateResponse>.FailedResponse("user not found.");
           
            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (result.Succeeded)
            {
                // authentication successful so generate jwt and refresh tokens
                var jwtToken = generateJwtToken(user);
                var refreshToken = generateRefreshToken(ipAddress);

                // save refresh token
                user.RefreshTokens.Add(refreshToken);
                _context.Update(user);
                _context.SaveChanges();

                return BaseServiceResponse<AuthenticateResponse>.SuccessFullResponse(new AuthenticateResponse(user, jwtToken, refreshToken.Token));
            }
            return BaseServiceResponse<AuthenticateResponse>.FailedResponse("invalid username or password");

        }

        public AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            // return null if no user found with token
            if (user == null) return null;

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // return null if token is no longer active
            if (!refreshToken.IsActive) return null;

            // replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            user.RefreshTokens.Add(newRefreshToken);
            _context.Update(user);
            _context.SaveChanges();

            // generate new jwt
            var jwtToken = generateJwtToken(user);

            return new AuthenticateResponse(user, jwtToken, newRefreshToken.Token);
        }

        public bool RevokeToken(string token, string ipAddress)
        {
            var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            // return false if no user found with token
            if (user == null) return false;

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // return false if token is not active
            if (!refreshToken.IsActive) return false;

            // revoke token and save
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            _context.Update(user);
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<UserDto> GetAll()
        {
            return _context.Users.Select(ToUserDto);
        }

        public UserModel GetById(Guid id)
        {
            return (_context.Users.Find(id));
        }

        // helper methods
        private string generateJwtToken( UserModel user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(15);

            var token = new JwtSecurityToken(
                null,
                null,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
//        private string generateJwtToken(UserModel user)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
//            var claims = new List<Claim>
//            {
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim(ClaimTypes.NameIdentifier, user.Id)
//            };
//            var tokenDescriptor = new JwtSecurityToken()
//            {
//                Claims = claims,
//                Expires = DateTime.UtcNow.AddMinutes(60),
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };
//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }


        private UserDto ToUserDto(UserModel user)
        {

            return new UserDto()
            {
                 DisplayName = user.DisplayName,
                 Bio =  user.Bio,
                 BirthDay = user.BirthDay,
                 City = $"{user.City?.City},{user.City?.Province}",
                 Favorites = user.Favorites,
                 UserName = user.UserName,
                 Website = user.Website
                 
            };
        }
        
    }

   
}


