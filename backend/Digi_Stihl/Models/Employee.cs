using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models
{
    public enum Arbeitsverhaeltnis
    {
        Befristet,
        Unbefristet
    }

    public enum BereichTyp
    {
        Direkt,
        Indirekt
    }

    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid EmployeeGuid { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Vorname { get; set; } = string.Empty;

        public DateTime? Eintritt { get; set; }
        public DateTime? Befristung { get; set; }
        public DateTime? Verlaengerung1 { get; set; }
        public DateTime? Verlaengerung2 { get; set; }
        public DateTime? BefristungMax { get; set; }
        public DateTime? Freistellung { get; set; }
        public DateTime? Kuendigung { get; set; }

        [Required]
        public Arbeitsverhaeltnis Arbeitsverhaeltnis { get; set; }

        [Required]
        public BereichTyp Bereich { get; set; }

        [Required, Range(0, 1)]
        [Column(TypeName = "decimal(3,2)")]
        public decimal FTE { get; set; }

        // Foreign Key zum Department
        [ForeignKey("Department")]
        public string? Kostenstelle { get; set; }
        public Department? Department { get; set; }

        public string? Funktion { get; set; }
        public string? Bemerkung { get; set; }

        // FK auf ExitReason-Tabelle
        [ForeignKey("ExitReason")]
        public int? ExitReasonId { get; set; }
        public ExitReason? ExitReason { get; set; }

        public ICollection<CapacityDeviation>? CapacityDeviations { get; set; }
    }
}
