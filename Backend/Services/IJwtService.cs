using Backend.Model.DTOs;
using Backend.Model;

namespace Backend.Services
{
    public interface IJwtService
    {
        string GenerateToken(UsuarioJwtDTO usuario);
    }
}