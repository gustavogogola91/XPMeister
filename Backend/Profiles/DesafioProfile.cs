using AutoMapper;
using Backend.Model;

public class DesafioProfile : Profile
{
    public DesafioProfile()
    {
        CreateMap<AlternativaPostDTO, Alternativa>();

        CreateMap<DesafioPostDTO, Desafio>()
            .ForMember(dest => dest.Alternativas, opt => opt.MapFrom(src => src.Alternativas));

        CreateMap<Desafio, DesafioDTO>()
            .ForMember(dest => dest.Questoes, opt => opt.MapFrom(src => src.Questoes))
            // Adicione outros mapeamentos se necessário
            ;
        CreateMap<Questao, QuestaoDTO>();
    }
}