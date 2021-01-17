namespace Mahoor.Services.User.Commands
{
    public class RegisterReponse
    {
        public RegisterReponse(bool needConfirmation,string userId)
        {
            NeedConfirmation = needConfirmation;
            UserId = userId;
        }
        public bool NeedConfirmation { get; set; }
        public string UserId { get; }
    }
}
