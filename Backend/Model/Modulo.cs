using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Modulo
    {
        [Key]
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public Dificuldade Dificuldade { get; set; }
        public string? Descricao { get; set; }

        public ICollection<Aula>? Aulas { get; set; }
        public ICollection<Desafio>? Desafios { get; set; }
    }
}