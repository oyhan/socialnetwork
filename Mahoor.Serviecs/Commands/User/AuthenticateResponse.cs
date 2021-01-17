using System.Text.Json.Serialization;

namespace Mahoor.Services.Commands.User
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(DomainObjects.User.UserModel user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            FirstName = user.Name;
            LastName = user.Family;
            Username = user.UserName;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}