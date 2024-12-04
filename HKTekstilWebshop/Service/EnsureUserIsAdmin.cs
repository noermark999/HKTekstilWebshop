using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HKTekstilWebshop.Service
{
    public class EnsureUserIsAdmin : ActionFilterAttribute
    {
        public EnsureUserIsAdmin() { }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.User;

            if (!ClaimsService.IsAdmin(user))
            {
                context.Result = new RedirectToActionResult("", "Home", null);
            }
        }
    }
}
