using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{   
     public class AvaliacaoDTO
     {
        [Required(ErrorMessage = "O campo é obrigatório.")]
        [Range(0, 5, ErrorMessage = "A nota deve estar entre 0 e 5 estrelas.")]
        public int Nota { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Descricao { get; set; }

        //Caso preferir passar o Id do user por token, remover esse atributo do DTO
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public int UsuarioId { get; set; }
     }
}