using System.ComponentModel.DataAnnotations;
using Backend.Model;

namespace Backend.Models
{   
     public class Avaliacao
     {
        [Key]
        public int Id { get; private set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        [Range(0, 5, ErrorMessage = "A nota deve estar entre 0 e 5 estrelas.")]
        public int Nota { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O campo é obrigatório.")]
        public int UsuarioId {get; set;}
        public Usuario Usuario {get; set;}
        
        public bool Ativo { get; set; }

        public Avaliacao()
        {
            Ativo = true;
        }
     }
}