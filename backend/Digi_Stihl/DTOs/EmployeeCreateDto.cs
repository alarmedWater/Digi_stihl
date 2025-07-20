// DTOs/EmployeeCreateDto.cs
using System;
using Digi_Stihl.Models;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Data transfer object for creating a new employee. Used for POST /api/Employees.
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

        /// <summary>
        /// Indicates whether the employee's work is quantity-dependent.
        /// </summary>
        public bool Mengenabhaengig { get; set; }

        /// <summary>
        /// Optional: The ID of the exit reason.
        /// </summary>
        public int? ExitReasonId { get; set; }

        /// <summary>
        /// Optional: The employee's function or role.
        /// </summary>
        public string? Funktion { get; set; }
        /// <summary>
        /// Optional: The date the contract is fixed-term until.
        /// </summary>
        public DateTime? Befristung { get; set; }
        /// <summary>
        /// Optional: The date of termination.
        /// </summary>
        public DateTime? Kuendigung { get; set; }
        /// <summary>
        /// Optional: General remarks.
        /// </summary>
        public string? Bemerkung { get; set; }
    }
}
