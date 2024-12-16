using APIModels.Organization.AddOrganization;
using APIModels.Product.AddExtraChoice;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class AddExtraChoiceModel : IModel<AddExtraChoiceInput, AddExtraChoiceOutput>
    {
        public async Task<AddExtraChoiceOutput> Execute(AddExtraChoiceInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_AddExtraChoice]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@Title", input.Title));
                    command.Parameters.Add(new SqlParameter("@RecognizableName", input.RecognizableName));
                    command.Parameters.Add(new SqlParameter("@OptionList", input.OptionList));

                    await command.ExecuteNonQueryAsync();

                    return new AddExtraChoiceOutput();
                }
            }
        }
    }
}
