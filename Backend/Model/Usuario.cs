using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }

        [Required(ErrorMessage = "Nome é obrigatório.")]
        public string? Nome { get; set; }
        [Required(ErrorMessage = "Email é obrigatório.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Senha é obrigatório.")]
        public string? Senha { get; set; }
        public Roles Role { get; private set; }
        public bool Ativo { get; private set; }
        public TempoDeEstudo? estudo { get; set; }

    }
}