namespace Mahoor.Infrastructure
{
    public class AppSettings
    {
        public double NearByRadius { get; set; } = 2000;

        public string Secret { get; set; } =
            "kljaslk;djalskdj;laksjd;laksjdl jlkqjwdlk1jl21j;l1k2j 1;l2ekj1 2le;kj1 2l;ek";
        public string SmsTokenMessage { get; set; } = "کد ورود شما به اپلیکیشن ماهور :{token}";
        public string RedisUrl { get; set; }
        public string UiUrl { get; set; }
    }
}
