using ChefCode.Common.Interfaces;

namespace ChefCode.Common.WebFamework.Helper
{
    public class EmailSettings:IEmailSetting
    {
        public string UserName { get; }
        public string Password { get; }
        public string SmtpHostAddress { get; }
        public string FromAddress { get; }
        public int SmtpPort { get; }
        public bool EnableSSl { get; }
    }
}
