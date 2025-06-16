using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models
{
    public class CapacityDeviation
    {
        [Key]
        public int CapacityDeviationId { get; set; }

        // FK auf Employee
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }

        // Jahr & Monat als separate Felder
        [Range(2020, 2100)]
        public int Year  { get; set; }

        [Range(1, 12)]
        public int Month { get; set; }

        // Die neue Kapazität für genau diesen Monat
        [Column(TypeName = "decimal(5,2)")]
        public decimal NeueKapazitaet { get; set; }

        public string? Bemerkung { get; set; }
    }
}
