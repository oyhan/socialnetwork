namespace ChefCode.Common.Interfaces
{
    public interface IEmailSetting
    {
        string UserName { get; }

        string Password { get; }

        string SmtpHostAddress { get; }

        string FromAddress { get; }

        int SmtpPort { get; }

        bool EnableSSl { get; }
    }
}