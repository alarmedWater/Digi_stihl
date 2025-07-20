// DTOs/EmployeeDto.cs
using System;
using Digi_Stihl.Models;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Data Transfer Object for an employee.
    /// </summary>
    public class EmployeeDto
    {
        /// <summary>
        /// The employee's ID. Used for the CreatedAtAction result.
        /// </summary>
        public int EmployeeId { get; set; }

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

        /// <summary>
        /// Optional: The employee's department information.
        /// </summary>
        public DepartmentDto? Department { get; set; }

        public ExitReasonDto? ExitReason { get; set; }

        /// <summary>
        /// The employee's area type (e.g., direct, indirect).
        /// </summary>
        public BereichTyp Bereich { get; set; }
        /// <summary>
        /// The employee's employment type (e.g., permanent, temporary).
        /// </summary>
        public Arbeitsverhaeltnis Arbeitsverhaeltnis { get; set; }
    }
}
