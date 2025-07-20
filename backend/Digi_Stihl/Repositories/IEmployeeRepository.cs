using Digi_Stihl.Models;
using Digi_Stihl.DTOs;


namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Defines the contract for a repository handling employee data.
    /// </summary>
    public interface IEmployeeRepository
    {
        /// <summary>
        /// Adds a new employee entity asynchronously.
        /// </summary>
        /// <param name="entity">The employee entity to add.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task AddAsync(Employee entity);

        /// <summary>
        /// Updates an existing employee entity asynchronously.
        /// </summary>
        /// <param name="entity">The employee entity to update.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task UpdateAsync(Employee entity);

        /// <summary>
        /// Deletes an employee by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to delete.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task DeleteByIdAsync(int id);

        /// <summary>
        /// Retrieves an employee by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to retrieve.</param>
        /// <returns>The employee if found, otherwise null.</returns>
        Task<Employee?> GetByIdAsync(int id);

        /// <summary>
        /// Retrieves all employees asynchronously.
        /// </summary>
        /// <returns>A list of all employees.</returns>
        Task<IList<Employee>> GetAllAsync();

        /// <summary>
        /// Retrieves a filtered list of employees based on the provided criteria asynchronously.
        /// </summary>
        /// <param name="filters">The filter criteria.</param>
        /// <returns>A list of employees matching the filter criteria.</returns>
        Task<IList<Employee>> GetFilteredAsync(EmployeeFilterDto filters);
    }
}
