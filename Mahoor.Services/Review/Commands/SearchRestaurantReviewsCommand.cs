using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Review.Commands
{
    public class SearchRestaurantReviewsCommand : IRequest<BaseServiceResponse<List<RestaurantReviewItemDto>>>
    {
        public Guid RestaurantId { get; }
        public string Text { get; }

        public SearchRestaurantReviewsCommand(Guid restaurantId, string text)
        {
            RestaurantId = restaurantId;
            Text = text;
        }
    }
}
