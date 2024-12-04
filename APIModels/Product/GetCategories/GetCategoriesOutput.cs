using APIModels.Shared.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Product.GetCategories
{
    public class GetCategoriesOutput
    {
        public List<Category> Categories { get; set; }
    }
}
