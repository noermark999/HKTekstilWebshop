using APIModels.Shared.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Organization.GetOrganizations
{
    public class GetOrganizationOutput
    {
        public List<APIModels.Shared.Organization.Organization>? Organizations { get; set; }
    }
}
