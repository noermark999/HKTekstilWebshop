using APIModels.User.RegisterUser;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.User
{
    public class RegisterUserModel
    {
        public async Task<RegisterUserOutput> Execute(RegisterUserInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[User].[SP_USE_RegisterUser]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Firstname", input.Firstname));
                    command.Parameters.Add(new SqlParameter("@Lastname", input.Lastname));
                    command.Parameters.Add(new SqlParameter("@Email", input.Email));
                    command.Parameters.Add(new SqlParameter("@Phonenumber", input.Phonenumber));
                    command.Parameters.Add(new SqlParameter("@Username", input.Username));
                    command.Parameters.Add(new SqlParameter("@PasswordHash", input.PasswordHash));
                    command.Parameters.Add(new SqlParameter("@Salt", input.Salt));
                    command.Parameters.Add(new SqlParameter("@Organization", input.Organization));
                    command.Parameters.Add(new SqlParameter("@RegisterCode", input.RegisterCode));

                    await command.ExecuteNonQueryAsync();

                    return new RegisterUserOutput();
                }
            }
        }
    }
}
