using APIModels.Shared.Organization;

namespace HKTekstilWebshop.Models.Admin
{
    public class AddRegisterCodeViewModel
    {
        public List<Organization> Organizations { get; set; }
        public List<RegisterCode> RegisterCodes { get; set; }
    }
}
