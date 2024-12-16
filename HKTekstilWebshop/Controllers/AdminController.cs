using APIModels.Organization.AddOrganization;
using APIModels.Organization.AddRegisterCode;
using APIModels.Organization.GetOrganizations;
using APIModels.Organization.GetRegisterCodesForOrganization;
using APIModels.Product.AddCategory;
using APIModels.Product.AddColor;
using APIModels.Product.AddExtraChoice;
using APIModels.Product.AddProduct;
using APIModels.Product.AddSize;
using APIModels.Product.GetCategories;
using APIModels.Product.GetColors;
using APIModels.Product.GetExtraChoices;
using APIModels.Product.GetSizes;
using APIModels.Shared.Product;
using HKTekstilWebshop.DBService.Organization;
using HKTekstilWebshop.DBService.Product;
using HKTekstilWebshop.Models.Admin;
using HKTekstilWebshop.Models.ProductList;
using HKTekstilWebshop.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

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

        private AddExtraChoiceViewModel _addExtraChoiceViewModel = new();
        private GetExtraChoicesModel _getExtraChoicesModel = new();
        private AddExtraChoiceModel _addExtraChoiceModel = new();

        private AddOrganizationViewModel _addOrganizationViewModel = new();
        private GetOrganizationsModel _getOrganizationsModel = new();
        private AddOrganizationModel _addOrganizationModel = new();

        private AddRegisterCodeViewModel _addRegisterCodeViewModel = new();
        private GetRegisterCodesForOrganizationModel _getRegisterCodesForOrganizationModel = new();
        private AddRegisterCodeModel _addRegisterCodeModel = new();

        private AddProductViewModel _addProductViewModel = new();
        private AddProductModel _addProductModel = new();
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

        // ---------------------------------------- ExtraChoice ----------------------------------------------------

        [HttpGet("/admin/addextrachoice")]
        public async Task<IActionResult> GetAddExtraChoicePartial()
        {
            GetExtraChoicesInput input = new();
            var output = await _getExtraChoicesModel.Execute(input);

            _addExtraChoiceViewModel.extraChoices = output.ExtraChoices;

            return PartialView("~/Views/Admin/Partials/_AddExtraChoicePartial.cshtml", _addExtraChoiceViewModel);
        }

        [HttpPost("/admin/addextrachoice/create")]
        public async Task<IActionResult> AddExtraChoice([FromBody] AddExtraChoiceInput input)
        {
            try
            {
                input.OptionList = ConvertOptionsToDataTable(input.ExtraChoiceOptions);
                await _addExtraChoiceModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private DataTable ConvertOptionsToDataTable(List<ExtraChoiceOption> options)
        {
            var table = new DataTable();
            table.Columns.Add("ExtraChoiceOptionID", typeof(Guid));
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Description", typeof(string));
            table.Columns.Add("ExtraPrice", typeof(double));

            foreach (var option in options)
            {
                table.Rows.Add(Guid.NewGuid(), option.Name, option.Description, option.ExtraPrice);
            }

            return table;
        }

        // ---------------------------------------- Product ----------------------------------------------------

        [HttpGet("/admin/addproduct")]
        public async Task<IActionResult> GetAddProductPartial()
        {
            GetOrganizationsInput getOrganizationsInput = new();
            var getOrganizationsOutput = await _getOrganizationsModel.Execute(getOrganizationsInput);
            _addProductViewModel.Organizations = getOrganizationsOutput.Organizations;

            GetColorsInput getColorsInput = new();
            var getColorsOutput = await _getColorsModel.Execute(getColorsInput);
            _addProductViewModel.Colors = getColorsOutput.Colors;

            GetSizesInput getSizesInput = new();
            var getSizesOutput = await _getSizesModel.Execute(getSizesInput);
            _addProductViewModel.Sizes = getSizesOutput.Sizes;

            GetExtraChoicesInput getExtraChoicesInput = new();
            var getExtraChoicesOutput = await _getExtraChoicesModel.Execute(getExtraChoicesInput);
            _addProductViewModel.ExtraChoices = getExtraChoicesOutput.ExtraChoices;

            GetCategoriesInput getCategoriesInput = new();
            var getCategoriesOutput = await _getCategoriesModel.Execute(getCategoriesInput);
            _addProductViewModel.Categories = getCategoriesOutput.Categories;

            return PartialView("~/Views/Admin/Partials/_AddProductPartial.cshtml", _addProductViewModel);
        }

        [HttpPost("/admin/addproduct/create")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductInput input)
        {
            try
            {
                input.ColorList = ConvertGuidsToDataTable(input.Colors, "ColorID");
                input.SizeList = ConvertGuidsToDataTable(input.Sizes, "SizeID");
                input.ExtraChoiceList = ConvertGuidsToDataTable(input.extraChoices, "ExtraChoiceID");

                var formCollection = await Request.ReadFormAsync();
                var files = formCollection.Files;

                input.ImageURLs = await saveFiles(files);

                await _addProductModel.Execute(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private DataTable ConvertGuidsToDataTable(List<Guid> guids, string tablename)
        {
            var table = new DataTable();
            table.Columns.Add(tablename, typeof(Guid));

            foreach (var guid in guids)
            {
                table.Rows.Add(guid);
            }

            return table;
        }

        private async Task<DataTable> saveFiles(IFormFileCollection files)
        {
            var table = new DataTable();
            table.Columns.Add("ImageURL", typeof(string));
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var path = Path.Combine("wwwroot/Resources/Products", file.FileName);
                    var pathurl = Path.Combine("/Resources/Products", file.FileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    table.Rows.Add(pathurl);
                }
            }
            return table;
        }
    }
}
