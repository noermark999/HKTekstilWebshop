using APIModels.Shared.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Organization.GetRegisterCodesForOrganization
{
    public class GetRegisterCodesForOrganizationOutput
    {
        public List<RegisterCode> RegisterCodes { get; set; }
    }
}
