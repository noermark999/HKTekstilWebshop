using System.Security.Claims;

namespace HKTekstilWebshop.Service
{
    public static class ClaimsService
    {
        public static Guid GetOrganizationID(ClaimsPrincipal user)
        {
            return Guid.Parse(user.FindFirst(c => c.Type == "OrganizationID").Value);
        }

        public static bool IsAdmin(ClaimsPrincipal user)
        {
            return user.IsInRole("Admin");
        }
    }
}
