using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Shared.Product
{
    public class ExtraChoiceOption
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public double? ExtraPrice { get; set; }
        public Guid ExtraChoiceID { get; set; }
    }
}
