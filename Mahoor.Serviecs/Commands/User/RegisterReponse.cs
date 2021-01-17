using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.User;

namespace Mahoor.Services.Commands.User
{
    public class RegisterReponse
    {
        public RegisterReponse(bool needConfirmation, UserModel user)
        {
            NeedConfirmation = needConfirmation;
            User = user;
        }
        public bool NeedConfirmation { get; set; }
        public UserModel User { get; set; }
    }
}
