using APIModels.Organization.AddOrganization;
using APIModels.Product.AddCategory;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class AddCategoryModel : IModel<AddCategoryInput, AddCategoryOutput>
    {
        public async Task<AddCategoryOutput> Execute(AddCategoryInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_AddCategory]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Name", input.Name));
                    command.Parameters.Add(new SqlParameter("@Description", input.Description));

                    await command.ExecuteNonQueryAsync();

                    return new AddCategoryOutput();
                }
            }
        }
    }
}
