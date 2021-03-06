using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Helper;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Post.Events;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Mahoor.Services.User.Handlers
{
    public class EditProfileCommandHandler : ServiceBase, IRequestHandler<EditProfileCommand, BaseServiceResponse<bool>>

    {
        private readonly AppUserManager _userManager;
        private readonly IAppRepository<CityModel, Guid> _cityRepository;

        public EditProfileCommandHandler(AppUserManager userManager,IAppRepository<CityModel,Guid> cityRepository)
        {
            _userManager = userManager;
            _cityRepository = cityRepository;
        }

        public async Task<BaseServiceResponse<bool>> Handle(EditProfileCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userManager.UserManager.FindByIdAsync(request.UserId);
                if (user == null)
                {
                    return BaseServiceResponse<bool>.FailedResponse("invalid user");
                }
                if (request.Medias.Count > 0)
                {
                    foreach (var media in request.Medias)
                    {

                        if (media.File.Name == "header")
                        {
                            var relativePath = $"/user/{user.UserName}/header/";
                            var directory = $"{ContentPath}{relativePath}";
                            var fileName = $"{Guid.NewGuid()}.webp";
                            var header = $"{directory}/{fileName}";
                            if (!Directory.Exists(directory))
                            {
                                Directory.CreateDirectory(directory);
                            }

                            //SaveImage(media.File, jpg,new JpegFormat());
                            SaveImage(media.File, header);

                            media.Path = $"{relativePath}{fileName}";
                            user.ProfileHeaderPicture = media.Path;
                        }
                        if(media.File.Name == "avatar")
                        {
                            var relativePath = $"/user/{user.UserName}/avatar/";
                            var directory = $"{ContentPath}{relativePath}";
                            var fileName = $"{Guid.NewGuid()}.webp";
                            var mainAvatar = $"{directory}/{fileName}";
                            if (!Directory.Exists(directory))
                            {
                                Directory.CreateDirectory(directory);
                            }

                            //SaveImage(media.File, jpg,new JpegFormat());
                            SaveImage(media.File, mainAvatar);

                            media.Path = $"{relativePath}{fileName}";
                            user.AvatarUrl = media.Path;
                        }
                        
                    }

                   
                }

                var city = await _cityRepository.GetByIdAsync(request.CityId);
                if (city == null)
                {
                    return BaseServiceResponse<bool>.FailedResponse("invalid city");
                }

                user.CityId = request.CityId;
                user.Bio = request.Bio;
                user.Favorites = request.Favorites;
                user.Website = request.Website;
                user.UserName = request.UserName;
                user.DisplayName = request.DisplayName;
                user.CurrentCity = $"{city.City},{city.Province}";

                var updateResult = await _userManager.UserManager.UpdateAsync(user);
                if (updateResult.Succeeded)
                {
                    return BaseServiceResponse<bool>.SuccessFullResponse(true);

                }

                return BaseServiceResponse<bool>.FailedResponse("error in updating user", updateResult.GetErrors());






            }
            catch (Exception exception)
            {

                return BaseServiceResponse<bool>.FailedResponse("error", exception.ToString());
            }

        }

        private async void SaveImage(IFormFile file, string path)
        {
            await using var fileStream= File.Create(path);
//            await using var fileStream = new FileStream(path, FileMode.CreateNew);
            await file.CopyToAsync(fileStream);
            //using (var imageFactory = new ImageFactory(preserveExifData: false))
            //{
            //    imageFactory.Load(file.OpenReadStream())
            //        .Format(format)
            //        .Quality(100)
            //        .Save(fileStream);
            //}
            fileStream.Close();
        }
    }
}
