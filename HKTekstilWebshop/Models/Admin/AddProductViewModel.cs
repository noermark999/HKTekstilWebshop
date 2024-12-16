using APIModels.Shared.Organization;
using APIModels.Shared.Product;

namespace HKTekstilWebshop.Models.Admin
{
    public class AddProductViewModel
    {
        public List<Organization> Organizations { get; set; }
        public List<Color> Colors { get; set; }
        public List<Size> Sizes { get; set; }
        public List<ExtraChoice> ExtraChoices { get; set; }
        public List<Category> Categories { get; set; }
    }
}
