using static BCrypt.Net.BCrypt;
namespace Backend.Services
{
    public class EncryptService : IEncryptService
    {
        public EncryptService()
        {
        }

        public string HashUserPassword(string password)
        {
            int workFactor = 12;

            var hash = HashPassword(password, workFactor: workFactor);

            return hash;

        }

        public bool CheckPassword(string password, string hash)
        {
            return Verify(password, hash);
        }
    }
}