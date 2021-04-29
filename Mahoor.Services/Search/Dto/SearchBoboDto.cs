using Mahoor.Services.City.Dto;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User;
using Mahoor.Services.User.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Search.Dto
{
    public class SearchBoboDto
    {
        public List<UserSearchResultDto> Users { get; set; }
        public List<PlaceSearchDto> Restaurants { get; set; }
        public List<CityDto> Citys { get; set; }
    }
}
