using System;
using System.Collections.Generic;

namespace Mahoor.Services.Commands.Post
{
    public class EditPostCommand
    {
        public Guid UserId { get; set; }
        public string Text { get; set; }
        public List<byte[]> Photos { get; set; }
        public long Lat { get; set; }
        public long Long { get; set; }
        public Guid? PlaceId { get; set; }
    }
}
