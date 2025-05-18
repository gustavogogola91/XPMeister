namespace Backend.Model
{
    public class AulaCompletaDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public ModuloDTO? Modulo { get; set; } 
        public int NumeroSequencia { get; set; }
        public string? Descricao { get; set; }
        public string? LinkVideo { get; set; }
        public string? LinkArquivo { get; set; }
    }
}