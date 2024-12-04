using APIModels.Product.GetPagedProductsForOrganization;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class GetPagedProductsForOrganizationModel : IModel<GetPagedProductsForOrganizationInput, GetPagedProductsForOrganizationOutput>
    {
        public async Task<GetPagedProductsForOrganizationOutput> Execute(GetPagedProductsForOrganizationInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_GetPagedProductsForOrganization]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@PageNumber", input.PageNumber);
                    command.Parameters.AddWithValue("@PageSize", input.PageSize);
                    command.Parameters.AddWithValue("@OrganizationID", input.OrganizationID);

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetPagedProductsForOrganizationOutput();

                    List<APIModels.Shared.Product.Product> products = new List<APIModels.Shared.Product.Product>();

                    while (await reader.ReadAsync())
                    {
                        var product = new APIModels.Shared.Product.Product
                        {
                            ID = Guid.Parse(reader["PR_PK"].ToString()),
                            Name = reader["PR_Name"].ToString(),
                            Price = double.Parse(reader["PR_Price"].ToString()),
                            Organization = new APIModels.Shared.Organization.Organization { Name = reader["OR_Name"].ToString() },
                            MainImage = new APIModels.Shared.Product.Image { ImageURL = reader["ImageURL"].ToString() }
                        };
                        products.Add(product);

                        if(output.TotalProducts == 0) {
                            output.TotalProducts = (int)reader["TotalProducts"];
                        }
                    }
                    
                    reader.Close();

                    output.Products = products;

                    return output;
                }
            }
        }
    }
}

