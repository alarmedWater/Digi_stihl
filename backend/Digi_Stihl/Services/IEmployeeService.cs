// /Services/IEmployeeService.cs
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    /// <summary>
    /// Defines the contract for a service handling employee data.
    /// </summary>
    public interface IEmployeeService
    {
        /// <summary>
        /// Creates a new employee asynchronously.
        /// </summary>
        /// <param name="createDto">The DTO containing data for the new employee.</param>
        /// <returns>The created employee DTO.</returns>
        Task<EmployeeDto> CreateEmployeeAsync(EmployeeCreateDto createDto);

        /// <summary>
        /// Updates an existing employee asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to update.</param>
        /// <param name="dto">The DTO containing updated data for the employee.</param>
        /// <returns>The updated employee DTO if found, otherwise null.</returns>
        Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto dto);

        /// <summary>
        /// Deletes an employee by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to delete.</param>
        /// <returns>True if the employee was deleted, false otherwise.</returns>
        Task<bool> DeleteEmployeeAsync(int id);

        /// <summary>
        /// Retrieves an employee by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to retrieve.</param>
        /// <returns>The employee DTO if found, otherwise null.</returns>
        Task<EmployeeDto?> GetEmployeeByIdAsync(int id);

        /// <summary>
        /// Retrieves a filtered list of employees based on the provided criteria asynchronously.
        /// </summary>
        /// <param name="filters">The filter criteria.</param>
        /// <returns>A list of employee DTOs matching the filter criteria.</returns>
        Task<IList<EmployeeDto>> GetEmployeesAsync(EmployeeFilterDto filters);
    }
}
