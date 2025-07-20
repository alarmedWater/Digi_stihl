using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models
{
    public class CapacityDeviation
{
    [Key] public int CapacityDeviationId { get; set; }

    /// <summary>
    /// Foreign key for the employee.
    /// </summary>
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    /// <summary>
    /// The start date of the capacity deviation.
    /// </summary>
    [Column(TypeName = "date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    /// The end date of the capacity deviation.
    /// </summary>
    [Column(TypeName = "date")]
    public DateTime EndDate { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal NeueKapazitaet { get; set; }

    public string? Bemerkung { get; set; }
}

}
