using System.ComponentModel.DataAnnotations;
using Backend.Model;

namespace Backend.Models
{
    public class LembreteDTO
    {
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Titulo { get; set; } = null!;

        public string? Descricao { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public DateTime DataLembrete {get; set;}

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public TipoLembrete Tipo {get; set;}

        public int UsuarioId {get; set;}
    }
}