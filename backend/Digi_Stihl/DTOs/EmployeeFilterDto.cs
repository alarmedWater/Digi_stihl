// DTOs/EmployeeFilterDto.cs
using System;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Filter criteria for employee queries.
    /// </summary>
    public class EmployeeFilterDto
    {
        public string? Name { get; set; }
        public string? Vorname { get; set; }
        public DateTime? EintrittFrom { get; set; }
        public DateTime? EintrittTo { get; set; }
        public string? Funktion { get; set; }
        public string? Kostenstelle { get; set; }

        /// <summary>
        /// The employee's area type (e.g., direct, indirect).
        /// </summary>
        public Digi_Stihl.Models.BereichTyp? Bereich { get; set; }
        /// <summary>
        /// The employee's employment type (e.g., permanent, temporary).
        /// </summary>
        public Digi_Stihl.Models.Arbeitsverhaeltnis? Arbeitsverhaeltnis { get; set; }

        public int? ExitReasonId { get; set; }
        public decimal? MinFTE { get; set; }
        public decimal? MaxFTE { get; set; }
    }
}
