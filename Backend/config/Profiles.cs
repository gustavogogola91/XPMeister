using AutoMapper;
using Backend.Model;
using Backend.Model.DTO.Forum;

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
            CreateMap<Usuario, UsuarioComentarioDTO>();
            CreateMap<UsuarioPostDTO, Usuario>();

            CreateMap<Modulo, ModuloDTO>();
            CreateMap<ModuloPostDTO, Modulo>();

            CreateMap<Comentario, ComentarioDTO>();
            CreateMap<ComentarioPostDTO, Comentario>();

            CreateMap<Postagem, PostagemDTO>();
            CreateMap<PostagemPostDTO, Postagem>();
        }
    }
}