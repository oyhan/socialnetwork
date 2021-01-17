using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class EditUserRequest : IRequest<EditUserReponse>
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Family { get; set; }
        public string City { get; set; }
        public string Bio { get; set; }
    }
}
