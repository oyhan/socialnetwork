using System.Collections.Generic;

namespace ChefCode.SyncFusion.UrlAdaptor
{
    public class UrlAdaptorRequest<TValue, TKey>
    {
        public IReadOnlyList<SearchItem> Search { get; set; }

        public IReadOnlyList<SortItem> Sorted { get; set; }

        public IReadOnlyList<string> Group { get; set; }

        public int Skip { get; set; }

        public int Take { get; set; }

        public string Action { get; set; }

        public TValue Value { get; set; }

        public TKey Key { get; set; }
    }
}