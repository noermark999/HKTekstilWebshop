using APIModels.Shared.Product;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Product.AddProduct
{
    public class AddProductInput
    {
        public string Name {  get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public Guid CategoryID { get; set; }
        public Guid OrganizationID { get; set; }
        public DataTable ColorList { get; set; }
        public List<Guid> Colors { get; set; } // For JS Mapping
        public DataTable SizeList { get; set; }
        public List<Guid> Sizes { get; set; } // For JS Mapping
        public DataTable ExtraChoiceList { get; set; }
        public List<Guid> extraChoices { get; set; } // For JS Mapping
        public DataTable ImageURLs { get; set; }
    }
}
