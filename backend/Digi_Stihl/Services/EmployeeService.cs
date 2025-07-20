namespace Digi_Stihl.Services
{
    /// <summary>
    /// Provides services for managing employee data.
    /// </summary>
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repo;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="EmployeeService"/> class.
        /// </summary>
        /// <param name="repo">The employee repository.</param>
        /// <param name="mapper">The AutoMapper instance.</param>
        public EmployeeService(IEmployeeRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        /// <summary>
        /// Creates a new employee asynchronously.
        /// </summary>
        /// <param name="dto">The DTO containing data for the new employee.</param>
        /// <returns>The created employee DTO.</returns>
        public async Task<EmployeeDto> CreateEmployeeAsync(EmployeeCreateDto dto)
        {
            // Map DTO to entity
            var entity = _mapper.Map<Employee>(dto);

            // Generate a unique GUID for the employee
            entity.EmployeeGuid = Guid.NewGuid();

            // Save the new employee
            await _repo.AddAsync(entity);

            // Map the entity (with generated ID) back to DTO
            return _mapper.Map<EmployeeDto>(entity);
        }

        /// <summary>
        /// Updates an existing employee asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to update.</param>
        /// <param name="dto">The DTO containing updated data for the employee.</param>
        /// <returns>The updated employee DTO if found, otherwise null.</returns>
        public async Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto dto)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) 
                return null;

            // Map incoming DTO onto existing entity
            _mapper.Map(dto, existing);
            await _repo.UpdateAsync(existing);

            // Return updated DTO
            return _mapper.Map<EmployeeDto>(existing);
        }

        /// <summary>
        /// Deletes an employee by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to delete.</param>
        /// <returns>True if the employee was deleted, false otherwise.</returns>
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) 
                return false;

            await _repo.DeleteByIdAsync(id);
            return true;
        }

        /// <summary>
        /// Retrieves an employee by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the employee to retrieve.</param>
        /// <returns>The employee DTO if found, otherwise null.</returns>
        public async Task<EmployeeDto?> GetEmployeeByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null 
                ? null 
                : _mapper.Map<EmployeeDto>(entity);
        }

        /// <summary>
        /// Retrieves a filtered list of employees based on the provided criteria asynchronously.
        /// </summary>
        /// <param name="filters">The filter criteria.</param>
        /// <returns>A list of employee DTOs matching the filter criteria.</returns>
        public async Task<IList<EmployeeDto>> GetEmployeesAsync(EmployeeFilterDto filters)
        {
            var entities = await _repo.GetFilteredAsync(filters);
            return _mapper.Map<IList<EmployeeDto>>(entities);
        }
    }
}
