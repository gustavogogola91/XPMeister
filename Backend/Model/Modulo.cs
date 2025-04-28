using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Modulo
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Titulo é obrigatório")]
        public string? Titulo { get; set; }

        [Required(ErrorMessage = "Dificuldade é obrigatório")]
        public Dificuldade Dificuldade { get; set; }

        [Required(ErrorMessage = "Descrição é obrigatório")]
        public string? Descricao { get; set; }

        //TODO: Retirar o comentario das linhas abaixo no momento em que os objs relacionados estejam criados
        // public ICollection<Aulas> Aulas { get; set; }
        // public ICollection<Desafios> Desafios { get; set; }
    }
}