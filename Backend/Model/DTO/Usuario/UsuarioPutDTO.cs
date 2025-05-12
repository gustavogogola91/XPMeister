namespace Backend.Model
{
    public class UsuarioPutDTO
    {
        public string? SenhaAtual { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public string? Senha { get; set; }
        public Roles Role { get; private set; }
        public TempoDeEstudo? estudo { get; set; }
    }
}