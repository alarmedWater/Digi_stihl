// DTOs/EmployeeFilterDto.cs
using System;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Filterkriterien für Mitarbeiter-Abfragen
    /// </summary>
    public class EmployeeFilterDto
    {
        public string? Name { get; set; }
        public string? Vorname { get; set; }
        public DateTime? EintrittFrom { get; set; }
        public DateTime? EintrittTo { get; set; }
        public string? Funktion { get; set; }
        public string? Kostenstelle { get; set; }

        // Enums aus dem Model
        public Digi_Stihl.Models.BereichTyp? Bereich { get; set; }
        public Digi_Stihl.Models.Arbeitsverhaeltnis? Arbeitsverhaeltnis { get; set; }

        public int? ExitReasonId { get; set; }
        public decimal? MinFTE { get; set; }
        public decimal? MaxFTE { get; set; }
    }
}
