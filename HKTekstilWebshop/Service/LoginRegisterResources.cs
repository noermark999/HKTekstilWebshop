using System.Security.Cryptography;
using System.Text;

namespace HKTekstilWebshop.Service
{
    public class LoginRegisterResources
    {
        public static byte[] GenerateSalt()
        {
            return RandomNumberGenerator.GetBytes(16);
        }

        public static byte[] HashPassword(string password, byte[] salt)
        {
            int iterations = 10000;
            int hashByteSize = 32;
            var hash = Rfc2898DeriveBytes.Pbkdf2(Encoding.UTF8.GetBytes(password), salt, iterations, HashAlgorithmName.SHA256, hashByteSize);
            return hash;
        }
    }
}
