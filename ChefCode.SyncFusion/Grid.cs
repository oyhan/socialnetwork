using System.Collections.Generic;

namespace ChefCode.SyncFusion
{
    public class Grid<T, TKey>
    {
        public T Value { get; set; }

        public TKey Key { get; set; }

        public List<T> Deleted { get; set; }
    }
}