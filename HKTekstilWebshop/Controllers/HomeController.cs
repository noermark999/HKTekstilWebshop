using HKTekstilWebshop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HKTekstilWebshop.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            Console.WriteLine(User.FindFirst(ClaimTypes.Sid));
            Console.WriteLine(User.Identity.IsAuthenticated);
            return View("~/Views/Home/Index.cshtml");
        }
    }
}
