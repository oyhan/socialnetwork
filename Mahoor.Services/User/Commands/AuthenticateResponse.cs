using System.Text.Json.Serialization;

namespace Mahoor.Services.User.Commands
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(DomainObjects.User.UserModel user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            DisplayName = user.DisplayName;
            UserName = user.UserName;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}