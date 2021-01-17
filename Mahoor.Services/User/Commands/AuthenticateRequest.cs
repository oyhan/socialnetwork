﻿using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class AuthenticateRequest :IRequest<AuthenticateResponse>
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
    public class ConfirmPhoneNumberReponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }

    public class ConfirmPhoneNumberCommand :IRequest<ConfirmPhoneNumberReponse>
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
