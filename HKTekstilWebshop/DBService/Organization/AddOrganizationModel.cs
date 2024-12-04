using APIModels.Organization.AddOrganization;
using APIModels.User.RegisterUser;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Organization
{
    public class AddOrganizationModel : IModel<AddOrganizationInput, AddOrganizationOutput>
    {
        public async Task<AddOrganizationOutput> Execute(AddOrganizationInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Organization].[SP_ORG_AddOrganization]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Name", input.Name));
                    command.Parameters.Add(new SqlParameter("@Address", input.Address));
                    command.Parameters.Add(new SqlParameter("@ContactEmail", input.ContactEmail));
                    command.Parameters.Add(new SqlParameter("@ContactPhoneNumber", input.ContactPhoneNumber));

                    await command.ExecuteNonQueryAsync();

                    return new AddOrganizationOutput();
                }
            }
        }
    }
}
