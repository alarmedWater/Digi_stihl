// DTOs/DepartmentDto.cs
namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Data Transfer Object for a department.
    /// </summary>
    public class DepartmentDto
    {
        /// <summary>
        /// The cost center of the department.
        /// </summary>
        public string Kostenstelle { get; set; } = string.Empty;

        /// <summary>
        /// The name of the department.
        /// </summary>
        public string Abteilungsname { get; set; } = string.Empty;

        /// <summary>
        /// The area number of the department.
        /// </summary>
        public string Bereichsnummer { get; set; } = string.Empty;
    }
}