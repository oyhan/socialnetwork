using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Mahoor.Services
{
    public class ServiceBase
    {
        public string ContentPath => $"{Directory.GetCurrentDirectory()}/wwwroot";
    }
}
