namespace Backend.Model
{
    public class DesafioPutDTO
    {
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public string? Alternativas { get; set; }
        public Dificuldade NivelDificuldade { get; set; }
        public double PontuacaoMaxima { get; set; }
        public int UsuarioId {get; set;}
        public int ModuloId {get;set;}
    }
}