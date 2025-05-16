using Digi_Stihl.DTOs;
using Digi_Stihl.Models;

namespace Digi_Stihl.Services;

public interface IEmployeeService
{
    Task<Employee> CreateEmployeeAsync(EmployeeDto dto);
    Task<Employee?> UpdateEmployeeAsync(int id, EmployeeDto dto);
    Task<bool> DeleteEmployeeAsync(int id);
    Task<Employee?> GetEmployeeByIdAsync(int id);
    Task<IList<Employee>> GetEmployeesAsync(EmployeeFilterDto filters);
}
