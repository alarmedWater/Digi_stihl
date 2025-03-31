namespace Digi_Stihl.Models;
public class CapacityDeviation
{
    public int CapacityDeviationId { get; set; }

    public int EmployeeId { get; set; }  // Foreign Key
    public Employee? Employee { get; set; }

    public DateTime Startdatum { get; set; }
    public DateTime Enddatum { get; set; }
    public decimal NeueKapazitaet { get; set; }
    public string Bemerkung { get; set; } = string.Empty;
}
