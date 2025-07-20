// Repositories/ICapacityRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Defines the contract for a repository handling capacity-related data.
    /// </summary>
    public interface ICapacityRepository
    {
        /// <summary>
        /// Retrieves a list of capacity deviations based on the provided filter criteria.
        /// </summary>
        /// <param name="filter">The filter criteria for capacity deviations.</param>
        /// <returns>A list of capacity deviations.</returns>
        Task<IList<CapacityDeviation>> GetDeviationsAsync(CapacityFilterDto filter);

        /// <summary>
        /// Adds a new capacity deviation to the repository.
        /// </summary>
        /// <param name="deviation">The capacity deviation to add.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task AddDeviationAsync(CapacityDeviation deviation);

        /// <summary>
        /// Retrieves a single capacity deviation by its ID.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to retrieve.</param>
        /// <returns>The capacity deviation if found, otherwise null.</returns>
        Task<CapacityDeviation?> GetDeviationByIdAsync(int id);

        /// <summary>
        /// Updates an existing capacity deviation in the repository.
        /// </summary>
        /// <param name="deviation">The capacity deviation to update.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task UpdateDeviationAsync(CapacityDeviation deviation);

        /// <summary>
        /// Deletes a capacity deviation by its ID.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to delete.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task DeleteDeviationAsync(int id);

        /// <summary>
        /// Retrieves all employees of a specific type (e.g., direct or indirect).
        /// </summary>
        /// <param name="bereich">The type of employee area to filter by.</param>
        /// <returns>A list of employees.</returns>
        Task<IList<Employee>> GetEmployeesByTypeAsync(BereichTyp bereich);
    }
}
