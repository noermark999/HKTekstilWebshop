using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Shared.Product
{
    public class Image
    {
        public Guid? ID { get; set; }
        public string ImageURL { get; set; }
        public Guid? ProductID { get; set; }
    }
}
