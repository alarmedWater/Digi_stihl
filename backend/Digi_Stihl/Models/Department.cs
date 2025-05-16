using System.ComponentModel.DataAnnotations;

namespace Digi_Stihl.Models;

public class Department
{
    [Key]
    public string Kostenstelle { get; set; } = string.Empty;

    public string Abteilungsname { get; set; } = string.Empty;
    public string Bereichsnummer { get; set; } = string.Empty;

    public ICollection<Employee>? Employees { get; set; }
}
