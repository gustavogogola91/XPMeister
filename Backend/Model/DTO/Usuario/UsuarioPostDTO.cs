using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class UsuarioPostDTO
    {
        [Required(ErrorMessage = "Nome é obrigatório.")]
        public string? Nome { get; set; }
        [Required(ErrorMessage = "Email é obrigatório.")]
        public string? Email { get; set; }
         [Required(ErrorMessage = "Senha é obrigatório.")]
        public string? Senha { get; set; }
        public Roles Role { get; set; }
        public TempoDeEstudo? Estudo { get; set; }
    }
}