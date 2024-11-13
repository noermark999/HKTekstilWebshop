using APIModels.User.GetUserInfo;
using APIModels.User.GetUserLogin;
using HKTekstilWebshop.DBService.User;
using HKTekstilWebshop.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Session;
using System.Security.Claims;

namespace HKTekstilWebshop.Controllers
{
    public class LoginController : Controller
    {
        private GetUserLoginModel _getUserLoginModel = new();
        private GetUserInfoModel _getUserInfoModel = new();
        public IActionResult Index()
        {
            return View("~/Views/LoginRegister/Login.cshtml");
        }

        [HttpPost("Login/Submit")]
        public async Task<IActionResult> TryLogin([FromBody] GetUserLoginInput input)
        {
            GetUserLoginOutput output;

            output = await _getUserLoginModel.Execute(input);

            if (output.PasswordHash != null) 
            {
                byte[] enteredPasswordHash = LoginRegisterResources.HashPassword(input.Password, output.Salt);
                if (enteredPasswordHash.SequenceEqual(output.PasswordHash))
                {
                    await GetUserInfo(output.ID);
                    return RedirectToAction("Index", "Home");
                }
            }
            return BadRequest("Incorrect password");
        }

        private async Task GetUserInfo(Guid userID)
        {
            var input = new GetUserInfoInput()
            {
                ID = userID
            };
            var output = await _getUserInfoModel.Execute(input);

            var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Sid, output.UserModel.ID.ToString()),
                        new Claim(ClaimTypes.Name, output.UserModel.Firstname),
                        new Claim(ClaimTypes.Surname, output.UserModel.Lastname),
                        new Claim(ClaimTypes.MobilePhone, output.UserModel.PhoneNumber),
                        new Claim("OrganizationID", output.UserModel.OrganizationID.ToString()),
                    };
            if (output.UserModel.Admin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Login");
        }
    }
}
