using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Product.AddExtraChoice
{
    public class AddExtraChoiceInput
    {
        public string Title { get; set; }
        public DataTable OptionList { get; set; }
    }
}
