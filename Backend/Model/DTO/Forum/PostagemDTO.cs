namespace Backend.Model.DTO.Forum
{
    public class PostagemDTO
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Conteudo { get; set; }
        public UsuarioComentarioDTO? Autor { get; set; }
        public DateTime? DataCriacao { get; set; }
        public ICollection<ComentarioDTO>? Comentarios { get; set; }
    }
}