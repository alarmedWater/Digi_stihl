using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models;

public class CapacityDeviation
{
    [Key]
    public int CapacityDeviationId { get; set; }

    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    public DateTime Startdatum { get; set; }
    public DateTime Enddatum { get; set; }
    public decimal NeueKapazitaet { get; set; }
    public string Bemerkung { get; set; } = string.Empty;
}
