﻿using System;
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
#if DEBUG
//            return "a18be9c0-aa65-4af8-bd17-00bd9344e575"; //admin user
#endif
            return user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
        }


        public static string GetErrors(this IdentityResult result)
        {


            var errors = result.Errors.Select(e => e.Description);
            return string.Join(",", errors);
        }
    }
}
