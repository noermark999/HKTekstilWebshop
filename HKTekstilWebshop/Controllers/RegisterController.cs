using APIModels.Organization.GetOrganizations;
using APIModels.Shared.Organization;
using APIModels.User.RegisterUser;
using HKTekstilWebshop.DBService.Organization;
using HKTekstilWebshop.DBService.User;
using HKTekstilWebshop.Models.LoginRegister;
using HKTekstilWebshop.Service;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace HKTekstilWebshop.Controllers
{
    public class RegisterController : Controller
    {
        private RegisterModel _registerModel = new();

        private GetOrganizationsModel _organizationsModel = new();
        private RegisterUserModel _registerUserModel = new();

        public async Task<IActionResult> IndexAsync()
        {
            _registerModel.Organizations = await GetOrganizations();

            HttpContext.Session.SetString("UserID", "For testing");
            return View("~/Views/LoginRegister/Register.cshtml", _registerModel);
        }

        private async Task<List<Organization>> GetOrganizations()
        {
            var input = new GetOrganizationInput();
            var output = await _organizationsModel.Execute(input);
            return output.Organizations;
        }

        [HttpPost("Register/Submit")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserInput registerUserInput)
        {
            byte[] salt = LoginRegisterResources.GenerateSalt();
            byte[] passwordHash = LoginRegisterResources.HashPassword(registerUserInput.Password, salt);

            registerUserInput.Salt = salt;
            registerUserInput.PasswordHash = passwordHash;

            try
            {
                await _registerUserModel.Execute(registerUserInput);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }

        [HttpGet("Register/Success")]
        public IActionResult RegisterSuccess()
        {
            return View("~/Views/LoginRegister/RegisterSuccess.cshtml");
        }
    }
}
