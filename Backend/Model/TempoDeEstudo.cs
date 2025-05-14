using Microsoft.EntityFrameworkCore;

namespace Backend.Model
{
    [Owned]
    public class TempoDeEstudo
    {
        public int Id { get; set; }
        public bool Segunda { get; set; }
        public bool Terca { get; set; }
        public bool Quarta { get; set; }
        public bool Quinta { get; set; }
        public bool Sexta { get; set; }
        public bool Sabado { get; set; }
        public bool Domingo { get; set; }
        public int horasDiarias { get; set; }
    }
}