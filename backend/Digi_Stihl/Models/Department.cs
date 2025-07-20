using System.ComponentModel.DataAnnotations;

namespace Digi_Stihl.Models;

public class Department
{
    /// <summary>
    /// The cost center of the department.
    /// </summary>
    [Key]
    public string Kostenstelle { get; set; } = string.Empty;

    /// <summary>
    /// The name of the department.
    /// </summary>
    public string Abteilungsname { get; set; } = string.Empty;

    /// <summary>
    /// The area number of the department.
    /// </summary>
    public string Bereichsnummer { get; set; } = string.Empty;

    /// <summary>
    /// The employees in the department.
    /// </summary>
    public ICollection<Employee>? Employees { get; set; }
}
