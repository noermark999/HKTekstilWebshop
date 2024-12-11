using APIModels.Organization.AddOrganization;
using APIModels.Organization.AddRegisterCode;
using APIModels.Organization.GetOrganizations;
using APIModels.Organization.GetRegisterCodesForOrganization;
using APIModels.Product.AddCategory;
using APIModels.Product.AddColor;
using APIModels.Product.AddSize;
using APIModels.Product.GetCategories;
using APIModels.Product.GetColors;
using APIModels.Product.GetSizes;
using HKTekstilWebshop.DBService.Organization;
using HKTekstilWebshop.DBService.Product;
using HKTekstilWebshop.Models.Admin;
using HKTekstilWebshop.Models.ProductList;
using HKTekstilWebshop.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HKTekstilWebshop.Controllers
{
    [Authorize]
    [EnsureUserIsAdmin]
    public class AdminController : Controller
    {
        private AddCategoryViewModel _addCategoryViewModel = new();
        private GetCategoriesModel _getCategoriesModel = new();
        private AddCategoryModel _addCategoryModel = new();

        private AddSizeViewModel _addSizeViewModel = new();
        private GetSizesModel _getSizesModel = new();
        private AddSizeModel _addSizeModel = new();

        private AddColorViewModel _addColorViewModel = new();
        private GetColorsModel _getColorsModel = new();
        private AddColorModel _addColorModel = new();

        private AddOrganizationViewModel _addOrganizationViewModel = new();
        private GetOrganizationsModel _getOrganizationsModel = new();
        private AddOrganizationModel _addOrganizationModel = new();

        private AddRegisterCodeViewModel _addRegisterCodeViewModel = new();
        private GetRegisterCodesForOrganizationModel _getRegisterCodesForOrganizationModel = new();
        private AddRegisterCodeModel _addRegisterCodeModel = new();
        public IActionResult Index()
        {
            return View("~/Views/Admin/Admin.cshtml");
        }

        // ---------------------------------------- Size ----------------------------------------------------
        [HttpGet("/admin/addsize")]
        public async Task<IActionResult> GetAddSizePartial()
        {
            GetSizesInput input = new();
            var output = await _getSizesModel.Execute(input);

            _addSizeViewModel.sizes = output.Sizes;

            return PartialView("~/Views/Admin/Partials/_AddSizePartial.cshtml", _addSizeViewModel);
        }

        [HttpPost("/admin/addsize/create")]
        public async Task<IActionResult> AddSize([FromBody] AddSizeInput input)
        {
            try
            {
                await _addSizeModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ---------------------------------------- Organization ----------------------------------------------------

        [HttpGet("/admin/addorganization")]
        public async Task<IActionResult> GetAddOrganizationPartial()
        {
            GetOrganizationsInput input = new();
            var output = await _getOrganizationsModel.Execute(input);

            _addOrganizationViewModel.Organizations = output.Organizations;

            return PartialView("~/Views/Admin/Partials/_AddOrganizationPartial.cshtml", _addOrganizationViewModel);
        }

        [HttpPost("/admin/addorganization/create")]
        public async Task<IActionResult> AddOrganization([FromBody] AddOrganizationInput input)
        {
            try
            {
                await _addOrganizationModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ---------------------------------------- Register Code ----------------------------------------------------

        [HttpGet("/admin/addregistercode")]
        public async Task<IActionResult> GetAddRegistercodePartial()
        {
            GetOrganizationsInput input = new();
            var output = await _getOrganizationsModel.Execute(input);

            _addRegisterCodeViewModel.Organizations = output.Organizations;

            return PartialView("~/Views/Admin/Partials/_AddRegisterCodePartial.cshtml", _addRegisterCodeViewModel);
        }

        [HttpGet("/admin/getregistercodes/{id}")]
        public async Task<IActionResult> GetRegisterCodes(Guid id)
        {
            GetRegisterCodesForOrganizationInput input = new GetRegisterCodesForOrganizationInput
            {
                Organization = id
            };
            var output = await _getRegisterCodesForOrganizationModel.Execute(input);
            _addRegisterCodeViewModel.RegisterCodes = output.RegisterCodes;
            return PartialView("~/Views/Admin/Partials/_RegisterCodeListPartial.cshtml", _addRegisterCodeViewModel);
        }

        [HttpPost("/admin/addregistercode/create")]
        public async Task<IActionResult> AddRegistercode([FromBody] AddRegisterCodeInput input)
        {
            try
            {
                await _addRegisterCodeModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ---------------------------------------- Category ----------------------------------------------------

        [HttpGet("/admin/addcategory")]
        public async Task<IActionResult> GetAddCategoryPartial()
        {
            GetCategoriesInput input = new();
            var output = await _getCategoriesModel.Execute(input);

            _addCategoryViewModel.categories = output.Categories;

            return PartialView("~/Views/Admin/Partials/_AddCategoryPartial.cshtml", _addCategoryViewModel);
        }

        [HttpPost("/admin/addcategory/create")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryInput input)
        {
            try
            {
                await _addCategoryModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ---------------------------------------- Color ----------------------------------------------------

        [HttpGet("/admin/addcolor")]
        public async Task<IActionResult> GetAddColorPartial()
        {
            GetColorsInput input = new();
            var output = await _getColorsModel.Execute(input);

            _addColorViewModel.Colors = output.Colors;

            return PartialView("~/Views/Admin/Partials/_AddColorPartial.cshtml", _addColorViewModel);
        }

        [HttpPost("/admin/addcolor/create")]
        public async Task<IActionResult> AddColor([FromBody] AddColorInput input)
        {
            try
            {
                await _addColorModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
