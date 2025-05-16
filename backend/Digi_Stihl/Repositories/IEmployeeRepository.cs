using Digi_Stihl.Models;
using Digi_Stihl.DTOs;


namespace Digi_Stihl.Repositories
{
    public interface IEmployeeRepository
    {
        Task AddAsync(Employee entity);
        Task UpdateAsync(Employee entity);
        Task DeleteByIdAsync(int id);
        Task<Employee?> GetByIdAsync(int id);
        Task<IList<Employee>> GetAllAsync();
        Task<IList<Employee>> GetFilteredAsync(EmployeeFilterDto filters);
    }
}
