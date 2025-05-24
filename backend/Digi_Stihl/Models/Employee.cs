using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models;

public class Employee
{
    //Testverison alles nullable außer ein paar

    // Primärschlüssel – bleibt nicht nullable
    [Key]
    public int EmployeeId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid EmployeeGuid { get; set; }

    // Nachname – weiterhin erforderlich
    [Required]
    public string Name { get; set; } = string.Empty;

    // Vorname – weiterhin erforderlich
    [Required]
    public string Vorname { get; set; } = string.Empty;

    // Eintritt – jetzt nullable, damit man ihn weglassen kann
    public DateTime? Eintritt { get; set; }

    // Alle Datumsfelder nullable
    public DateTime? Befristung { get; set; }
    public DateTime? Verlaengerung1 { get; set; }
    public DateTime? Verlaengerung2 { get; set; }
    public DateTime? BefristungMax { get; set; }
    public DateTime? Freistellung { get; set; }
    public DateTime? Kuendigung { get; set; }

    // Austrittsart nullable
    public string? Austrittsart { get; set; }

    // Bemerkung schon nullable
    public string? Bemerkung { get; set; }

    // Funktion nullable
    public string? Funktion { get; set; }

    // Foreign-Key nullable
    [ForeignKey("Department")]
    public string? Kostenstelle { get; set; }

    public Department? Department { get; set; }

    // FTE jetzt nullable
    public decimal? FTE { get; set; }

    // Bereich nullable
    public string? Bereich { get; set; }

    // Mengenabhaengig nullable
    public string? Mengenabhaengig { get; set; }

    // Arbeitsverhaeltnis nullable
    public string? Arbeitsverhaeltnis { get; set; }

    // Navigation ebenfalls nullable
    public ICollection<CapacityDeviation>? CapacityDeviations { get; set; }
}



    //Version mit nunnalbe richtig
    // [Key]
    // public int EmployeeId { get; set; }

    //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    //public Guid EmployeeGuid { get; set; }

    // [Required]
    // public string Name { get; set; } = string.Empty;

    // [Required]
    // public string Vorname { get; set; } = string.Empty;

    // [Required]
    // public DateTime Eintritt { get; set; }

    // public DateTime? Befristung { get; set; }
    // public DateTime? Verlaengerung1 { get; set; }
    // public DateTime? Verlaengerung2 { get; set; }
    // public DateTime? BefristungMax { get; set; }
    // public DateTime? Freistellung { get; set; }
    // public DateTime? Kuendigung { get; set; }

    // public string Austrittsart { get; set; } = string.Empty;
    // public string? Bemerkung { get; set; }

    // [Required]
    // public string Funktion { get; set; } = string.Empty;

    // [Required]
    // [ForeignKey("Department")]
    // public string Kostenstelle { get; set; } = string.Empty;

    // public Department? Department { get; set; }

    // [Required]
    // public decimal FTE { get; set; }

    // [Required]
    // public string Bereich { get; set; } = string.Empty;

    // [Required]
    // public string Mengenabhaengig { get; set; } = string.Empty;

    // [Required]
    // public string Arbeitsverhaeltnis { get; set; } = string.Empty;

    // public ICollection<CapacityDeviation>? CapacityDeviations { get; set; }

