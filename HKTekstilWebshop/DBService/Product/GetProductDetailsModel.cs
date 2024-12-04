using APIModels.Product.GetPagedProductsForOrganization;
using APIModels.Product.GetProductDetails;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HKTekstilWebshop.DBService.Product
{
    public class GetProductDetailsModel : IModel<GetProductDetailsInput, GetProductDetailsOutput>
    {
        public async Task<GetProductDetailsOutput> Execute(GetProductDetailsInput input)
        {
            using (SqlConnection connection = new SqlConnection(ConfigManager.ConnectionString))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand("[Product].[SP_PRO_GetProductDetails]", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ProductID", input.ProductID);

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    var product = new APIModels.Shared.Product.Product();

                    while (await reader.ReadAsync())
                    {
                        product.ID = Guid.Parse(reader["PR_PK"].ToString());
                        product.Name = reader["PR_Name"].ToString();
                        product.Price = double.Parse(reader["PR_Price"].ToString());
                        product.Organization = new APIModels.Shared.Organization.Organization { Name = reader["OR_Name"].ToString() };
                    }

                    // Second result set: Colors
                    if (await reader.NextResultAsync())
                    {
                        product.Colors = new List<APIModels.Shared.Product.Color>();
                        while (await reader.ReadAsync())
                        {
                            product.Colors.Add(new APIModels.Shared.Product.Color
                            {
                                ID = Guid.Parse(reader["CP_Color"].ToString()),
                                ColorName = reader["CP_ColorName"].ToString()
                            });
                        }
                    }

                    // Third result set: Sizes
                    if (await reader.NextResultAsync())
                    {
                        product.Sizes = new List<APIModels.Shared.Product.Size>();
                        while (await reader.ReadAsync())
                        {
                            product.Sizes.Add(new APIModels.Shared.Product.Size
                            {
                                ID = Guid.Parse(reader["SP_Size"].ToString()),
                                SizeName = reader["SP_SizeName"].ToString()
                            });
                        }
                    }

                    // Fourth result set: Extra Choices
                    if (await reader.NextResultAsync())
                    {
                        product.ExtraChoices = new List<APIModels.Shared.Product.ExtraChoice>();

                        while (await reader.ReadAsync())
                        {
                            var extraChoice = new APIModels.Shared.Product.ExtraChoice
                            {
                                ID = Guid.Parse(reader["EP_ExtraChoice"].ToString()),
                                Title = reader["ExtraChoiceTitle"].ToString(),
                                Options = new List<APIModels.Shared.Product.ExtraChoiceOption>()
                            };

                            product.ExtraChoices.Add(extraChoice);
                            
                        }
                    }

                    // Fifth result set: Extra Choice Options
                    if (await reader.NextResultAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var extraChoiceID = Guid.Parse(reader["ExtraChoiceID"].ToString());

                            if (product.ExtraChoices.FirstOrDefault(ec => ec.ID == extraChoiceID) is APIModels.Shared.Product.ExtraChoice extraChoice)
                            {
                                extraChoice.Options.Add(new APIModels.Shared.Product.ExtraChoiceOption
                                {
                                    ID = Guid.Parse(reader["OptionID"].ToString()),
                                    Name = reader["OptionName"].ToString(),
                                    Description = reader["OptionDescription"].ToString(),
                                    ExtraPrice = reader["OptionExtraPrice"] != DBNull.Value ? (double)reader["OptionExtraPrice"] : null
                                });
                            }
                        }
                    }

                    // Sixth result set: Images
                    if (await reader.NextResultAsync())
                    {
                        product.Images = new List<APIModels.Shared.Product.Image>();
                        while (await reader.ReadAsync())
                        {
                            product.Images.Add(new APIModels.Shared.Product.Image
                            {
                                ImageURL = reader["IM_ImageURL"].ToString()
                            });
                        }
                    }

                    reader.Close();

                    var output = new GetProductDetailsOutput()
                    {
                        Product = product
                    };
                    return output;
                }
            }
        }
    }
}
