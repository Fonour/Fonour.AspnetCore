using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Fonour.Application.UserApp;
using Fonour.Utility.Convert;
using Fonour.MVC.Models;

namespace Fonour.MVC.Controllers
{
    public abstract class FonourControllerBase : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            byte[] result; 
            filterContext.HttpContext.Session.TryGetValue("CurrentUser",out result);
            if (result == null)
            {
                filterContext.Result = new RedirectResult("/Login/Index");
                return;
            }
            base.OnActionExecuting(filterContext);
        }
    }
}
