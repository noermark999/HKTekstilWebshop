using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Organization.AddRegisterCode
{
    public class AddRegisterCodeInput
    {
        public string Code { get; set; }
        public Guid Organization { get; set; }
    }
}
