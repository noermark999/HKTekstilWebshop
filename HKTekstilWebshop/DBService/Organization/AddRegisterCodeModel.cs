using APIModels.Organization.AddOrganization;
using APIModels.Organization.AddRegisterCode;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Organization
{
    public class AddRegisterCodeModel : IModel<AddRegisterCodeInput, AddRegisterCodeOutput>
    {
        public async Task<AddRegisterCodeOutput> Execute(AddRegisterCodeInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Organization].[SP_ORG_AddRegisterCode]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Code", input.Code));
                    command.Parameters.Add(new SqlParameter("@Organization", input.Organization));

                    await command.ExecuteNonQueryAsync();

                    return new AddRegisterCodeOutput();
                }
            }
        }
    }
}
