namespace HKTekstilWebshop.DBService
{
    public static class ConfigManager
    {
        public static string ConnectionString { get; private set; }

        public static void Init(IConfiguration configuration)
        {
            ConnectionString = configuration.GetConnectionString("DefaultConnection");
        }
    }
}
