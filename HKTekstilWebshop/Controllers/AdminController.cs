using HKTekstilWebshop.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HKTekstilWebshop.Controllers
{
    [Authorize]
    [EnsureUserIsAdmin]
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Admin/Admin.cshtml");
        }
    }
}
