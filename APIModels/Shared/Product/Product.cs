using APIModels.Shared.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Shared.Product
{
    public class Product
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public Category? Category { get; set; }
        public Shared.Organization.Organization Organization { get; set; }
        public List<Image>? Images { get; set; }
        public Image MainImage { get; set; }
        public List<Color>? Colors { get; set; }
        public List<Size>? Sizes { get; set; }
        public List<ExtraChoice>? ExtraChoices { get; set; }

    }
}
