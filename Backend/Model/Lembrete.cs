using System.ComponentModel.DataAnnotations;
using Backend.Model;

namespace Backend.Models
{
    public class Lembrete
    {
        [Key]
        public int Id { get; private set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Titulo { get; set; } = null!;

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public DateTime DataLembrete {get; set;}

        public bool Pendente { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public TipoLembrete Tipo {get; set;}

        public int UsuarioId {get; set;}
        public Usuario Usuario {get; set;}
        public bool Ativo { get; set; }

        public Lembrete()
        {
            Ativo = true;
            Pendente = true;
        }
    }
}