using APIModels.User.GetUserInfo;
using APIModels.Shared.User;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.User
{
    public class GetUserInfoModel : IModel<GetUserInfoInput, GetUserInfoOutput>
    {
        public async Task<GetUserInfoOutput> Execute(GetUserInfoInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[User].[SP_USE_GetUserInfo]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@UserId", input.ID));

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    GetUserInfoOutput output = new();

                    while (await reader.ReadAsync())
                    {
                        output.UserModel = new UserModel
                        {
                            ID = Guid.Parse(reader["US_PK"].ToString()),
                            Firstname = (string)reader["US_Firstname"],
                            Lastname = (string)reader["US_Lastname"],
                            Email = (string)reader["US_Email"],
                            PhoneNumber = (string)reader["US_PhoneNumber"],
                            Admin = (bool)reader["US_Admin"],
                            OrganizationID = Guid.Parse(reader["US_Organization"].ToString()),
                        };
                    }
                    reader.Close();

                    return output;
                }
            }
        }
    }
}
