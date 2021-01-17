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

namespace Mahoor.Services.User.Handlers
{
    public class EditProfileCommandHandler : IRequestHandler<EditProfileCommand, BaseServiceResponse<bool>>

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



                //                var place = await _placeRepository.GetByIdAsync(command.PlaceId);
                ////                var place = await _db.Set<BasePlaceModel>().FindAsync(command.PlaceId);
                //                if (place==null)
                //                {
                //                    return BaseServiceResponse<Guid>.FailedResponse("invalid place");
                //
                //                }
                //save images 
                //
                //                foreach (var media in request.Medias)
                //                {
                var media = request.Medias[0];
                var relativePath = $"/user/{user.UserName}/avatar/";
                var directory = $"{Directory.GetCurrentDirectory()}{relativePath}";
                var fileName = $"{Guid.NewGuid()}_{media.Name}";
                var storagePath = $"{directory}/{fileName}";
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
                using (var fileStream = new FileStream(storagePath, FileMode.CreateNew))
                {
                    await media.File.CopyToAsync(fileStream);

                    fileStream.Close();
                }

                media.Path = $"{relativePath}{fileName}";
                //                }
                var city = await _cityRepository.GetByIdAsync(request.CityId);
                if (city==null)
                {
                    return BaseServiceResponse<bool>.FailedResponse("invalid city");
                }
                
                user.AvatarUrl = media.Path;
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
    }
}
