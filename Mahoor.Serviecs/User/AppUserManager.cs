using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.User;
using Mahoor.Infrastructure;
using Mahoor.Services.Commands.User;
using Mahoor.Services.Helper;
using Mahoor.Services.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Mahoor.Services.User
{
    public class AppUserManager : UserManager<UserModel>
    {

        private readonly AppSettings _appSettings;
        private AppDbContext _context;
        private readonly SignInManager<UserModel> _signInManager;

        public AppUserManager(IUserStore<UserModel> store,
            IOptions<IdentityOptions> optionsAccessor, IPasswordHasher<UserModel> passwordHasher,
            IEnumerable<IUserValidator<UserModel>> userValidators
            , IEnumerable<IPasswordValidator<UserModel>> passwordValidators,
            ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, IServiceProvider services,
            ILogger<UserManager<UserModel>> logger,
//            SignInManager<UserModel> signInManager,
            AppDbContext context,
            IOptions<AppSettings> appSettings


            ) :
            base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {

            _appSettings = appSettings.Value;
            _context = context;
//            _signInManager = signInManager;
        }


        public async Task<BaseServiceResponse<RegisterReponse>> Register(RegisterUserCommand command)
        {
            var user = new UserModel()
            {
                UserName = command.Username,
                PhoneNumber =  command.PhoneNumber
            };

            var result = await CreateAsync(user);
            if (result.Succeeded)
            {


                return BaseServiceResponse<RegisterReponse>.SuccessFullResponse(new RegisterReponse(true,user));
            }
            return BaseServiceResponse<RegisterReponse>.FailedResponse(result.GetErrors());

        }


        public async Task<BaseServiceResponse<AuthenticateResponse>> Authenticate(AuthenticateRequest model, string ipAddress)
        {
            var user = await FindByNameAsync(model.Username);

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

        public IEnumerable<UserModel> GetAll()
        {
            return _context.Users;
        }

        public UserModel GetById(int id)
        {
            return _context.Users.Find(id);
        }

        // helper methods

        private string generateJwtToken(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

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
    }
}


