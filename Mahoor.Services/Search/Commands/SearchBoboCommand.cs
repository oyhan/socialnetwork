using Mahoor.Services.Request;
using Mahoor.Services.Response;
using Mahoor.Services.Search.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Search.Commands
{
    public class SearchBoboCommand: BasePagedRequest<BaseServiceResponse<SearchBoboDto>>
    {
        public string Term { get;  }

        public SearchBoboCommand(string term, string requester, int from=0 , int to=10 )
        {
            Term = term;
            To = to;
            From = from;
            Requester = requester;
        }
    }
}
