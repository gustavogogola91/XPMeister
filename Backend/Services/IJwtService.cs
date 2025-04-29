using Backend.Model.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface IJwtService
    {
        string GenerateToken(UsuarioJwtDTO usuario);
    }
}