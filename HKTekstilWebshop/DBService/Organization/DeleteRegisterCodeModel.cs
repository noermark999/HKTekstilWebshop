using APIModels.Organization.AddOrganization;
using APIModels.Organization.DeleteRegisterCode;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Organization
{
    public class DeleteRegisterCodeModel : IModel<DeleteRegisterCodeInput, DeleteRegisterCodeOutput>
    {
        public async Task<DeleteRegisterCodeOutput> Execute(DeleteRegisterCodeInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Organization].[SP_ORG_DeleteRegisterCode]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@CodeID", input.ID));

                    await command.ExecuteNonQueryAsync();

                    return new DeleteRegisterCodeOutput();
                }
            }
        }
    }
}
