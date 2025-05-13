namespace Backend.Model
{
    public class AulaCompletaDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public Modulo? Modulo { get; set; } //TODO: ModuloDTO
        public int NumeroSequencia { get; set; }
        public string? Descricao { get; set; }
        public string? LinkVideo { get; set; }
        public string? LinkArquivo { get; set; }
    }
}