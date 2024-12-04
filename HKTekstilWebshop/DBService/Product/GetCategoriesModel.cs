using APIModels.Organization.GetOrganizations;
using APIModels.Product.GetCategories;
using APIModels.Shared.Product;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class GetCategoriesModel : IModel<GetCategoriesInput, GetCategoriesOutput>
    {
        public async Task<GetCategoriesOutput> Execute(GetCategoriesInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_GetCategories]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetCategoriesOutput();

                    List<Category> categories = new List<Category>();

                    while (await reader.ReadAsync())
                    {
                        var category = new Category
                        {
                            ID = Guid.Parse(reader["CA_PK"].ToString()),
                            Name = reader["CA_Name"].ToString(),
                            Description = reader["CA_Description"].ToString(),
                        };

                        categories.Add(category);
                    }
                    reader.Close();

                    output.Categories = categories;

                    return output;
                }
            }
        }
    }
}
