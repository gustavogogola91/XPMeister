namespace Backend.Model
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public Roles Role { get; set; }
        public bool Ativo { get; set; }
        public TempoDeEstudo? Estudo { get; set; }
    }
}