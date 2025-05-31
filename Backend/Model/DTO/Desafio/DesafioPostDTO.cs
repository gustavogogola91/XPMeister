using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class DesafioPostDTO
    {
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? Titulo { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? Descricao { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public Dificuldade NivelDificuldade { get; set; }
        public double PontuacaoMaxima { get; set; }
        public int UsuarioId { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public int ModuloId { get; set; }
    }
}