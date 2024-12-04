using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Product.GetPagedProductsForOrganization
{
    public class GetPagedProductsForOrganizationInput
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public Guid OrganizationID { get; set; }
    }
}
