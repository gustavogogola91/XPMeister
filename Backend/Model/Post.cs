namespace Backend.Model
{
    public class Post
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Conteudo { get; set; }
        public int AutorId { get; set; }
        public Usuario? Autor { get; set; }
        public DateTime DataCriacao { get; set; }

        public ICollection<Comentario>? Comentarios { get; set; }
    }
}