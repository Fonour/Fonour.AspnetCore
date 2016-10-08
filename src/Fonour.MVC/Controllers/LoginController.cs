using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Fonour.Application.UserApp;
using System.Collections.Specialized;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Fonour.Utility.Convert;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Fonour.MVC.Controllers
{
    public class LoginController : Controller
    {
        private IUserAppService _userAppService;
        public LoginController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        //[HttpPost]
        //public IActionResult Index()
        //{
        //    return null;
        //}
    }
}
