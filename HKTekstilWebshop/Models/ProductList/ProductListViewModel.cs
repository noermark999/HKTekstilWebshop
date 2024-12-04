namespace HKTekstilWebshop.Models.ProductList
{
    public class ProductListViewModel
    {
        public List<APIModels.Shared.Product.Product> products { get; set; }
        public int TotalProducts { get; set; }
        public int MaxPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
