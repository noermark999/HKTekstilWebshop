using APIModels.Organization.AddOrganization;
using APIModels.Product.AddColor;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class AddColorModel : IModel<AddColorInput, AddColorOutput>
    {
        public async Task<AddColorOutput> Execute(AddColorInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_AddColor]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@ColorName", input.ColorName));

                    await command.ExecuteNonQueryAsync();

                    return new AddColorOutput();
                }
            }
        }
    }
}
