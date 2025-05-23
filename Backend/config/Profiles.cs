using AutoMapper;
using Backend.Model;

namespace Backend.config
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Desafio, DesafioDTO>();
            CreateMap<Desafio, DesafioResumidoDTO>();
            CreateMap<DesafioPostDTO, Desafio>();

            CreateMap<Aula, AulaCompletaDTO>();
            CreateMap<Aula, AulaResumidaDTO>();
            CreateMap<AulaPostDTO, Aula>();

            CreateMap<Usuario, UsuarioJwtDTO>();
            CreateMap<Usuario, UsuarioDTO>();
            CreateMap<UsuarioPostDTO, Usuario>();

            CreateMap<Modulo, ModuloDTO>();
            CreateMap<ModuloPostDTO, Modulo>();
        }
    }
}