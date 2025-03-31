using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models;

public class Employee
{
    [Key]
    public int EmployeeId { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Vorname { get; set; } = string.Empty;

    [Required]
    public DateTime Eintritt { get; set; }

    public DateTime? Befristung { get; set; }
    public DateTime? Verlaengerung1 { get; set; }
    public DateTime? Verlaengerung2 { get; set; }
    public DateTime? BefristungMax { get; set; }
    public DateTime? Freistellung { get; set; }
    public DateTime? Kuendigung { get; set; }

    public string Austrittsart { get; set; } = string.Empty;
    public string? Bemerkung { get; set; }

    [Required]
    public string Funktion { get; set; } = string.Empty;

    [Required]
    [ForeignKey("Department")]
    public string Kostenstelle { get; set; } = string.Empty;

    public Department? Department { get; set; }

    [Required]
    public decimal FTE { get; set; }

    [Required]
    public string Bereich { get; set; } = string.Empty;

    [Required]
    public string Mengenabhaengig { get; set; } = string.Empty;

    [Required]
    public string Arbeitsverhaeltnis { get; set; } = string.Empty;

    public ICollection<CapacityDeviation>? CapacityDeviations { get; set; }
}
