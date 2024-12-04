using APIModels.Organization.GetOrganizations;
using APIModels.Organization.GetRegisterCodesForOrganization;
using APIModels.Shared.Organization;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Organization
{
    public class GetRegisterCodesForOrganizationModel : IModel<GetRegisterCodesForOrganizationInput, GetRegisterCodesForOrganizationOutput>
    {
        public async Task<GetRegisterCodesForOrganizationOutput> Execute(GetRegisterCodesForOrganizationInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Organization].[SP_ORG_GetRegisterCodesForOrganization]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetRegisterCodesForOrganizationOutput();

                    List<RegisterCode> registerCodes = new List<RegisterCode>();

                    while (await reader.ReadAsync())
                    {
                        var registerCode = new RegisterCode
                        {
                            ID = Guid.Parse(reader["RC_PK"].ToString()),
                            Code = reader["RC_Code"].ToString()
                        };

                        registerCodes.Add(registerCode);
                    }
                    reader.Close();

                    output.RegisterCodes = registerCodes;

                    return output;
                }
            }
        }
    }
}
