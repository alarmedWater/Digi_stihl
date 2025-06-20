// DTOs/EmployeeCreateDto.cs
using System;
using Digi_Stihl.Models;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Wird nur für POST /api/Employees verwendet, um einen neuen Mitarbeitenden anzulegen.
    /// </summary>
    public class EmployeeCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Vorname { get; set; } = string.Empty;
        public DateTime Eintritt { get; set; }
        public decimal FTE { get; set; }
        public BereichTyp Bereich { get; set; }
        public Arbeitsverhaeltnis Arbeitsverhaeltnis { get; set; }
        public string Kostenstelle { get; set; } = string.Empty;

        // Neu: Mengenabhängig, wenn in Deinem Model ein bool ist
        public bool Mengenabhaengig { get; set; }

        // Optional: schon Austrittsgrund mitliefern
        public int? ExitReasonId { get; set; }

        // Optional:
        public string? Funktion { get; set; }
        public DateTime? Befristung { get; set; }
        public DateTime? Kuendigung { get; set; }
        public string? Bemerkung { get; set; }
    }
}
