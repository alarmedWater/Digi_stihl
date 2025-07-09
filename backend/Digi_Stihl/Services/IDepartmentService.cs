// Digi_Stihl/Services/IDepartmentService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    public interface IDepartmentService
    {
        Task<IList<DepartmentDto>> GetAllAsync();
        Task<DepartmentDto?> GetByKeyAsync(string kostenstelle);
    }
}
