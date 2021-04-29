using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Mahoor.Services.Helper
{
    public static class IdentityHelper
    {
        public static string Id(this ClaimsPrincipal user)
        {
//#if DEBUG
//            return "028dd260-e0b8-421c-83fb-a65e6e794cb6"; //admin user
//#endif
            return user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
        }

        public static Guid IdGuid(this ClaimsPrincipal user)
        {
//#if DEBUG
//            return Guid.Parse("028dd260-e0b8-421c-83fb-a65e6e794cb6"); //admin user
//#endif
            return Guid.Parse(user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
        }

        public static string GetErrors(this IdentityResult result)
        {
            var errors = result.Errors.Select(e => e.Description);
            return string.Join(",", errors);
        }
    }
}
