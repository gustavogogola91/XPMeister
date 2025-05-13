namespace Backend.Model
{
    public class DesafioDTO
    {
        public int Id { get; private set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public Dificuldade NivelDificuldade { get; set; }
        public DateTime DataCriacao { get; set; }
        public double PontuacaoMaxima { get; set; }
        public UsuarioDTO? Usuario { get; set; }
        public Modulo? Modulo { get; set; } //TODO : Criar DTO modulo
        public bool Ativo { get; set; }
    }
}