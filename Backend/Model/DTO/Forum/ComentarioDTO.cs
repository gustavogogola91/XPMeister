namespace Backend.Model.DTO.Forum
{
    public class ComentarioDTO
    {
        public int Id { get; set; }
        public string? Conteudo { get; set; }
        public UsuarioComentarioDTO? Autor { get; set; }
        public string? DataCriacao { get; set; }
    }
}