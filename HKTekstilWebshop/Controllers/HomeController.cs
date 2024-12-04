using APIModels.Product.GetPagedProductsForOrganization;
using APIModels.Product.GetProductDetails;
using APIModels.Shared.Product;
using HKTekstilWebshop.DBService.Product;
using HKTekstilWebshop.Models.ProductList;
using HKTekstilWebshop.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HKTekstilWebshop.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private GetPagedProductsForOrganizationModel _getProductsForOrganizationModel = new();
        private GetProductDetailsModel _getProductDetailsModel = new();

        private ProductListViewModel _productsListViewModel = new();
        private ProductDetailsViewModel _productDetailsViewModel;

        private readonly int PAGESIZE = 6;
        public async Task<IActionResult> Index()
        {

            await UpdateProductListViewmodel(1);

            return View("~/Views/Home/ProductListView.cshtml", _productsListViewModel);
        }

        [HttpGet("/produkter&side={pageNumber}")]
        public async Task<IActionResult> Products(int pageNumber)
        {
            await UpdateProductListViewmodel(pageNumber);

            return View("~/Views/Home/ProductListView.cshtml", _productsListViewModel);
        }

        [HttpGet("/produktdetaljer/{id}")]
        public async Task<IActionResult> ProductDetails(Guid id)
        {
            GetProductDetailsInput input = new GetProductDetailsInput
            {
                ProductID = id
            };
            var output = await _getProductDetailsModel.Execute(input);

            _productDetailsViewModel = new ProductDetailsViewModel
            {
                Product = output.Product
            };

            return View("~/Views/Home/ProductDetailsView.cshtml", _productDetailsViewModel);
        }

        private async Task UpdateProductListViewmodel(int pageNumber)
        {
            GetPagedProductsForOrganizationInput input = new GetPagedProductsForOrganizationInput
            {
                PageNumber = pageNumber,
                PageSize = PAGESIZE,
                OrganizationID = ClaimsService.GetOrganizationID(User)
            };
            var output = await _getProductsForOrganizationModel.Execute(input);
            _productsListViewModel.products = output.Products;
            _productsListViewModel.TotalProducts = output.TotalProducts;

            _productsListViewModel.MaxPages = (output.TotalProducts + PAGESIZE - 1) / PAGESIZE;
            _productsListViewModel.CurrentPage = pageNumber;
        }
    }
}
