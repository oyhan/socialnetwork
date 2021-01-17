using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class RegisterUserCommand :IRequest<RegisterReponse>
    {

        public string PhoneNumber { get; set; }
        public string Username { get; set; }

    }
}
