using AutoMapper;
using Backend.Model;

namespace Backend.config
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Usuario, UsuarioJwtDTO>();
        }
    }
}