using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Organization.AddOrganization
{
    public class AddOrganizationInput
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }
    }
}
