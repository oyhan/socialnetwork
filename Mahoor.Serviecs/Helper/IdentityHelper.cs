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
            return user.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
        }


        public static string GetErrors(this IdentityResult result)
        {


            var errors = result.Errors.Select(e => e.Description);
            return string.Join(",", errors);
        }
    }
}
