using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class AulaPostDTO
    {
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? Nome { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public int ModuloId { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public int NumeroSequencia { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? Descricao { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? LinkVideo { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string? LinkArquivo { get; set; }
    }
}