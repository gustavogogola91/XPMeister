namespace Backend.Model
{
    public class Alternativa
    {
        public int Id { get; set; }
        public string Texto { get; set; } = string.Empty;
        public bool Correta { get; set; }
        public int DesafioId { get; set; }
        public Desafio? Desafio { get; set; }
    }
}