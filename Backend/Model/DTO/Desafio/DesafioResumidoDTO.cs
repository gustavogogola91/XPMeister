namespace Backend.Model
{
    public class DesafioResumidoDTO
    {
        public int Id { get; private set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public string? Alternativas { get; set; }
        public Dificuldade NivelDificuldade { get; set; }
        public DateTime DataCriacao { get; set; }
        public double PontuacaoMaxima { get; set; }
        public bool Ativo { get; set; }
    }
}