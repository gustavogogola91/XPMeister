namespace Backend.Model
{
    public class QuestaoDTO
    {
        public int Id { get; set; }
        public string? Texto { get; set; }
        public bool Correta { get; set; }
        public int DesafioId { get; set; }
    }
}