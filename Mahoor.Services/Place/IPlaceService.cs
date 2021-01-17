using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.Place;
using Mahoor.Services.Timeline.Dtos;

namespace Mahoor.Services.Place
{
    public interface IPlaceService 
    {
        Task<IReadOnlyList<RestaurantDto>> GetClosestRestaurants(double lat, double lon, double radius , int from , int to);
    }
}
