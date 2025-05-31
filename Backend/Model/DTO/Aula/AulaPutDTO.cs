namespace Backend.Model
{
    public class AulaPutDTO
    {
        public string? Nome { get; set; }
        public int ModuloId { get; set; }
        public int NumeroSequencia { get; set; }
        public string? Descricao { get; set; }
        public string? LinkVideo { get; set; }
        public string? LinkArquivo { get; set; }
    }
}