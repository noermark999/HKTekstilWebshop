using APIModels.Organization.GetOrganizations;
using APIModels.Product.GetExtraChoices;
using APIModels.Shared.Product;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class GetExtraChoicesModel : IModel<GetExtraChoicesInput, GetExtraChoicesOutput>
    {
        public async Task<GetExtraChoicesOutput> Execute(GetExtraChoicesInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_GetExtraChoices]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var output = new GetExtraChoicesOutput();

                    var extraChoices = new List<ExtraChoice>();

                    while (await reader.ReadAsync())
                    {
                        var extraChoice = new ExtraChoice
                        {
                            ID = Guid.Parse(reader["EC_PK"].ToString()),
                            Title = reader["EC_Title"].ToString(),
                            RecognizableName = reader["EC_RecognizableName"].ToString(),
                        };

                        extraChoices.Add(extraChoice);
                    }
                    reader.Close();

                    output.ExtraChoices = extraChoices;

                    return output;
                }
            }
        }
    }
}
