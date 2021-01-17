using System;

namespace Mahoor.Services.Commands.Comment
{
   public  class CreateCommentCommand
    {
        public Guid PostId { get; set; }
        public string Text { get; set; }
    }
}
