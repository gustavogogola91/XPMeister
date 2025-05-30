using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Desafio
    {
        [Key]
        public int Id { get; private set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public ICollection<Alternativa>? Alternativas { get; set; }
        public Dificuldade NivelDificuldade { get; set; }
        public DateTime DataEntrega {get; set;}
        public DateTime DataCriacao { get; private set; }
        public double PontuacaoMaxima { get; set; }
        public int UsuarioId {get; set;}
        public Usuario? Usuario {get; set;}
        public int ModuloId {get;set;}
        public Modulo? Modulo {get;set;}
        public bool Ativo { get; set; }
        public ICollection<Questao> Questoes { get; set; } = new List<Questao>();

        public Desafio()
        {
            Ativo = true;
            DataCriacao = DateTime.UtcNow;
        }

    }
}