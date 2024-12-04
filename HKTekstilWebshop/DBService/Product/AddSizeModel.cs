using APIModels.Organization.AddOrganization;
using APIModels.Product.AddSize;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class AddSizeModel : IModel<AddSizeInput,  AddSizeOutput>
    {
        public async Task<AddSizeOutput> Execute(AddSizeInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_AddSize]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Size", input.Size));

                    await command.ExecuteNonQueryAsync();

                    return new AddSizeOutput();
                }
            }
        }
    }
}
