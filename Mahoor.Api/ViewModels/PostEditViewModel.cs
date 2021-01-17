using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Mahoor.Api.ViewModels
{
    /// <summary>
    /// edit view model
    /// </summary>
    public class PostEditViewModel
    {
        /// <summary>
        /// id of the post to be edited
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// text to edit
        /// </summary>
        public string Text { get; set; }

    }
}
