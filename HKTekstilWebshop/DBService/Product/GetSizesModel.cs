using APIModels.Organization.GetOrganizations;
using APIModels.Product.GetSizes;
using APIModels.Shared.Product;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class GetSizesModel : IModel<GetSizesInput,  GetSizesOutput>
    {
        public async Task<GetSizesOutput> Execute(GetSizesInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_GetSizes]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetSizesOutput();

                    var sizes = new List<Size>();

                    while (await reader.ReadAsync())
                    {
                        var size = new Size
                        {
                            ID = Guid.Parse(reader["SI_PK"].ToString()),
                            SizeName = reader["SI_Size"].ToString(),
                        };

                        sizes.Add(size);
                    }
                    reader.Close();

                    output.Sizes = sizes;

                    return output;
                }
            }
        }
    }
}
