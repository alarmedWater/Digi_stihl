// Digi_Stihl/Services/IDepartmentService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    /// <summary>
    /// Defines the contract for a service handling department data.
    /// </summary>
    public interface IDepartmentService
    {
        /// <summary>
        /// Retrieves all departments asynchronously.
        /// </summary>
        /// <returns>A list of all department DTOs.</returns>
        Task<IList<DepartmentDto>> GetAllAsync();

        /// <summary>
        /// Retrieves a department by its cost center asynchronously.
        /// </summary>
        /// <param name="kostenstelle">The cost center of the department.</param>
        /// <returns>The department DTO if found, otherwise null.</returns>
        Task<DepartmentDto?> GetByKeyAsync(string kostenstelle);
    }
}
