using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Desafio
    {
        [Key]
        public int Id { get; private set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Titulo { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public string Descricao { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public Dificuldade NivelDificuldade { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public DateTime DataEntrega {get; set;}
        [Required(ErrorMessage = "O campo é obrigatório.")]
        public DateTime DataCriacao { get; private set; }
        public double PontuacaoMaxima { get; set; }
        [Required(ErrorMessage = "O campo é obrigatório.")]
        //TODO: criar conexão com Modulo
        public int UsuarioId {get; set;}
        public Usuario Usuario {get; set;}
        public bool Ativo { get; set; }

        public Desafio()
        {
            Ativo = true;
            DataCriacao = DateTime.UtcNow;
        }

    }
}