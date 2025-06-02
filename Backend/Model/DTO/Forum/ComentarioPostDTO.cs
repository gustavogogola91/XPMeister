namespace Backend.Model.DTO.Forum
{
    public class ComentarioPostDTO
    {
        public string? Conteudo { get; set; }
        public int AutorId { get; set; }
        public int PostagemId { get; set; }
    }
}