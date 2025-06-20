// DTOs/EmployeeDto.cs
using System;
using Digi_Stihl.Models;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Data Transfer Object für Mitarbeiter
    /// </summary>
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }        // für CreatedAtAction

        public string Name { get; set; } = string.Empty;
        public string Vorname { get; set; } = string.Empty;
        public DateTime? Eintritt { get; set; }
        public DateTime? Befristung { get; set; }
        public DateTime? Verlaengerung1 { get; set; }
        public DateTime? Verlaengerung2 { get; set; }
        public DateTime? BefristungMax { get; set; }
        public DateTime? Freistellung { get; set; }
        public DateTime? Kuendigung { get; set; }

        public int? ExitReasonId { get; set; }
        public string? Bemerkung { get; set; }
        public string Funktion { get; set; } = string.Empty;
        public string Kostenstelle { get; set; } = string.Empty;
        public decimal FTE { get; set; }

        // Optional: Abteilung aus Deinem DepartmentDto, wenn Du es anzeigen willst
        public DepartmentDto? Department { get; set; }

        public ExitReasonDto? ExitReason { get; set; }

        // Die Enums aus Deinem Models-Namespace
        public BereichTyp Bereich { get; set; }
        public Arbeitsverhaeltnis Arbeitsverhaeltnis { get; set; }
    }
}
