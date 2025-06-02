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

            CreateMap<AlternativaPostDTO, Alternativa>();

            CreateMap<DesafioPostDTO, Desafio>();

            CreateMap<Alternativa, AlternativaDTO>();
            
            CreateMap<Comentario, ComentarioDTO>().ForMember(dest => dest.DataCriacao, opt => opt.MapFrom(src => src.DataCriacao.Add(new TimeSpan(0, -3, 0, 0)).ToString("dd/MM/yyyy HH:mm:ss")));
            CreateMap<ComentarioPostDTO, Comentario>();

            CreateMap<Postagem, PostagemDTO>().ForMember(dest => dest.DataCriacao, opt => opt.MapFrom(src => src.DataCriacao.Add(new TimeSpan(0, -3, 0, 0)).ToString("dd/MM/yyyy HH:mm:ss")));
            CreateMap<PostagemPostDTO, Postagem>();

        }
    }
}