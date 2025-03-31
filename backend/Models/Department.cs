namespace Digi_Stihl.Models;
public class Department
{
    public string Kostenstelle { get; set; } = string.Empty; // Primary Key
    public string Abteilungsname { get; set; } = string.Empty;
    public string Bereichsnummer { get; set; } = string.Empty;

    public ICollection<Employee>? Employees { get; set; }
}
