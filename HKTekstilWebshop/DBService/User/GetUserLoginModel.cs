using APIModels.User.GetUserLogin;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.User
{
    public class GetUserLoginModel : IModel<GetUserLoginInput, GetUserLoginOutput>
    {
        public async Task<GetUserLoginOutput> Execute(GetUserLoginInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[User].[SP_USE_GetUserLogin]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Username", input.Username));

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    GetUserLoginOutput output = new();

                    while (await reader.ReadAsync())
                    {
                        output.ID = Guid.Parse(reader["US_PK"].ToString());
                        output.PasswordHash = (byte[])reader["US_PasswordHash"];
                        output.Salt = (byte[])reader["US_Salt"];
                    }
                    reader.Close();

                    return output;
                }
            }
        }
    }
}
