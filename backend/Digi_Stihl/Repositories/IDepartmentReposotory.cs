// Digi_Stihl/Repositories/IDepartmentRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Defines the contract for a repository handling department data.
    /// </summary>
    public interface IDepartmentRepository
    {
        /// <summary>
        /// Retrieves all departments asynchronously.
        /// </summary>
        /// <returns>A list of all departments.</returns>
        Task<IList<Department>> GetAllAsync();

        /// <summary>
        /// Retrieves a department by its cost center asynchronously.
        /// </summary>
        /// <param name="kostenstelle">The cost center of the department.</param>
        /// <returns>The department if found, otherwise null.</returns>
        Task<Department?> GetByKeyAsync(string kostenstelle);
    }
}
