using APIModels.Organization.AddOrganization;
using APIModels.Product.AddProduct;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class AddProductModel : IModel<AddProductInput, AddProductOutput>
    {
        public async Task<AddProductOutput> Execute(AddProductInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_AddProduct]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Name", input.Name));
                    command.Parameters.Add(new SqlParameter("@Description", input.Description));
                    command.Parameters.Add(new SqlParameter("@Price", input.Price));
                    command.Parameters.Add(new SqlParameter("@CategoryID", input.CategoryID));
                    command.Parameters.Add(new SqlParameter("@OrganizationID", input.OrganizationID));
                    command.Parameters.Add(new SqlParameter("@ColorList", input.ColorList));
                    command.Parameters.Add(new SqlParameter("@SizeList", input.SizeList));
                    command.Parameters.Add(new SqlParameter("@ExtraChoiceList", input.ExtraChoiceList));
                    command.Parameters.Add(new SqlParameter("@ImageURLs", input.ImageURLs));

                    await command.ExecuteNonQueryAsync();

                    return new AddProductOutput();
                }
            }
        }
    }
}
