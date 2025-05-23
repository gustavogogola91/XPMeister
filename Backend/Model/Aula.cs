using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    public class Aula
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }
        [Required(ErrorMessage = "IdModulo é obrigatório")]
        public int ModuloId { get; set; }
        [Required(ErrorMessage = "Número da Sequência é obrigatório")]
        public Modulo? Modulo { get; set; }
        public int NumeroSequencia { get; set; }
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string? Nome { get; set; }
        [Required(ErrorMessage = "Descrição é obrigatório")]
        public string? Descricao { get; set; }
        [Required(ErrorMessage = "Link do Vídeo é obrigatório")]
        public string? LinkVideo { get; set; }
        [Required(ErrorMessage = "Link do Arquivo é obrigatório")]
        public string? LinkArquivo { get; set; }
    }
}