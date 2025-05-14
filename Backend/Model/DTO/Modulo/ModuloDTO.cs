namespace Backend.Model
{
    public class ModuloDTO
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public Dificuldade Dificuldade { get; set; }
        public string? Descricao { get; set; }
        public ICollection<AulaResumidaDTO>? Aulas { get; set; }
        public ICollection<DesafioResumidoDTO>? Desafios { get; set; }
    }
}