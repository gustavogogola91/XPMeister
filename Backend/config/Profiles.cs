using AutoMapper;
using Backend.Model.DTOs;
using Backend.Models;

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