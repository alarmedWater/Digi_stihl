// Digi_Stihl/Repositories/IDepartmentRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    public interface IDepartmentRepository
    {
        Task<IList<Department>> GetAllAsync();
        Task<Department?> GetByKeyAsync(string kostenstelle);
    }
}
