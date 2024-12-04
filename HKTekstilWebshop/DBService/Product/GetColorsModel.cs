using APIModels.Organization.GetOrganizations;
using APIModels.Product.GetColors;
using APIModels.Shared.Product;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class GetColorsModel : IModel<GetColorsInput, GetColorsOutput>
    {
        public async Task<GetColorsOutput> Execute(GetColorsInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_GetColors]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetColorsOutput();

                    var colors = new List<Color>();

                    while (await reader.ReadAsync())
                    {
                        var color = new Color
                        {
                            ID = Guid.Parse(reader["CO_PK"].ToString()),
                            ColorName = reader["CO_ColorName"].ToString(),
                        };

                        colors.Add(color);
                    }
                    reader.Close();

                    output.Colors = colors;

                    return output;
                }
            }
        }
    }
}
