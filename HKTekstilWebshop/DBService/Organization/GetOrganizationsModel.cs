using APIModels.Organization.GetOrganizations;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Organization
{
    public class GetOrganizationsModel
    {
        public async Task<GetOrganizationOutput> Execute(GetOrganizationInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Organization].[SP_ORG_GetOrganizations]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetOrganizationOutput();

                    List<APIModels.Shared.Organization.Organization> organizations = new List<APIModels.Shared.Organization.Organization>();

                    while (await reader.ReadAsync())
                    {
                        var organization = new APIModels.Shared.Organization.Organization
                        {
                            ID = Guid.Parse(reader["OR_PK"].ToString()),
                            Name = reader["OR_Name"].ToString(),
                            Address = reader["OR_Address"].ToString(),
                            ContactEmail = reader["OR_ContactEmail"].ToString(),
                            ContactPhoneNumber = reader["OR_ContactPhoneNumber"].ToString()
                        };

                        organizations.Add(organization);
                    }
                    reader.Close();

                    output.Organizations = organizations;

                    return output;
                }
            }
        }
    }
}
