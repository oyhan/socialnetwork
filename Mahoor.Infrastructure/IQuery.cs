using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Infrastructure
{
    public interface IQuery
    {
         int From { get; set; }
         int To { get; set; }
    }
}
