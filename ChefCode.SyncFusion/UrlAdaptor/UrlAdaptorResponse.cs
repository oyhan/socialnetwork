using System.Collections.Generic;

namespace ChefCode.SyncFusion.UrlAdaptor
{
    public class UrlAdaptorResponse<TResult>
    {
        public IReadOnlyList<TResult> result { get; set; }

        public int count { get; set; }
    }
}