using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Questao
    {
        [Key]
        public int Id { get; set; }
        public string? Texto { get; set; }
        public bool Correta { get; set; }
        public int DesafioId { get; set; }
        public Desafio? Desafio { get; set; }
    }
}