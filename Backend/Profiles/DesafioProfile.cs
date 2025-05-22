using AutoMapper;
using Backend.Model;

public class DesafioProfile : Profile
{
    public DesafioProfile()
    {
        CreateMap<AlternativaPostDTO, Alternativa>();

        CreateMap<DesafioPostDTO, Desafio>()
            .ForMember(dest => dest.Alternativas, opt => opt.MapFrom(src => src.Alternativas));
    }
}