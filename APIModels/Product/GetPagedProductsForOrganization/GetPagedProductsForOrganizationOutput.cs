using APIModels.Shared.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Product.GetPagedProductsForOrganization
{
    public class GetPagedProductsForOrganizationOutput
    {
        public List<Shared.Product.Product> Products { get; set; }
        public int TotalProducts { get; set; }
    }
}
