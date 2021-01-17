using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChefCode.Common.BaseModels
{
    public class BaseModel<TId>
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public TId Id { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
