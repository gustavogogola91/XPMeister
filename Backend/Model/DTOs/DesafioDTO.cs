using System.ComponentModel.DataAnnotations;
using Backend.Model;

namespace Backend.Models
{
    public class DesafioDTO
    {
        [Required]
        public string Titulo { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public Dificuldade NivelDificuldade { get; set; }
        [Required]
        public DateTime DataEntrega { get; set; }
        public double PontuacaoMaxima { get; set; }
        [Required]
        public int UsuarioId { get; set; }
    }
}