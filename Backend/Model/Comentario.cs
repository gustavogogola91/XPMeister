namespace Backend.Model
{
    public class Comentario
    {
        public int Id { get; set; }
        public string? Conteudo { get; set; }
        public int AutorId { get; set; }
        public Usuario? Autor { get; set; }
        public int PostagemId { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}