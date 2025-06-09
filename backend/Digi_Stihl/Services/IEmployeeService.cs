// /Services/IEmployeeService.cs
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    public interface IEmployeeService
    {
        Task<EmployeeDto> CreateEmployeeAsync(EmployeeDto dto);
        Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto dto);
        Task<bool> DeleteEmployeeAsync(int id);
        Task<EmployeeDto?> GetEmployeeByIdAsync(int id);
        Task<IList<EmployeeDto>> GetEmployeesAsync(EmployeeFilterDto filters);
    }
}
