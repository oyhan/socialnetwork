using System.Collections.Generic;

namespace ChefCode.SyncFusion.UrlAdaptor
{
    public class SearchItem
    {
        public List<string> Fields { get; set; }

        public string Operator { get; set; }

        public string Key { get; set; }

        public bool IgnoreCase { get; set; }
    }
}