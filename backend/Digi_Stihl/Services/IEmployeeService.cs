// /Services/IEmployeeService.cs
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    // Services/IEmployeeService.cs
    public interface IEmployeeService
    {
        Task<EmployeeDto> CreateEmployeeAsync(EmployeeCreateDto createDto);
        Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto dto);
        Task<bool> DeleteEmployeeAsync(int id);
        Task<EmployeeDto?> GetEmployeeByIdAsync(int id);
        Task<IList<EmployeeDto>> GetEmployeesAsync(EmployeeFilterDto filters);
    
}

}
