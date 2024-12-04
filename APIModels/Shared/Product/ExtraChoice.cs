using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Shared.Product
{
    public class ExtraChoice
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string RecognizableName { get; set; }
        public Guid ProductID { get; set; }
        public List<ExtraChoiceOption> Options { get; set; }
    }
}
