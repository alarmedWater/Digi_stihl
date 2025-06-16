// DTOs/EmployeeFilterDto.cs

using Digi_Stihl.Models;

namespace Digi_Stihl.DTOs
{
    public class EmployeeFilterDto
    {
        public string? Name { get; set; }
        public string? Vorname { get; set; }
        public DateTime? EintrittFrom { get; set; }
        public DateTime? EintrittTo { get; set; }
        public string? Funktion { get; set; }
        public string? Kostenstelle { get; set; }

        // Neu: Enums statt Strings
        public BereichTyp? Bereich { get; set; }
        public Arbeitsverhaeltnis? Arbeitsverhaeltnis { get; set; }

        // Optional: Filter nach ExitReason
        public int? ExitReasonId { get; set; }

        public decimal? MinFTE { get; set; }
        public decimal? MaxFTE { get; set; }
    }
}
