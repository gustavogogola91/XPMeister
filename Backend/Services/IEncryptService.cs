namespace Backend.Services
{
    public interface IEncryptService
    {
        string HashUserPassword(string password);
        bool CheckPassword(string password, string hash);
    }
}