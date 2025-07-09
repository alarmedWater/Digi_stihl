// Digi_Stihl/Repositories/DepartmentRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Digi_Stihl.Data;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _ctx;
        public DepartmentRepository(ApplicationDbContext ctx) => _ctx = ctx;

        public async Task<IList<Department>> GetAllAsync()
            => await _ctx.Departments
                         .AsNoTracking()
                         .ToListAsync();

        public async Task<Department?> GetByKeyAsync(string kostenstelle)
            => await _ctx.Departments
                         .AsNoTracking()
                         .FirstOrDefaultAsync(d => d.Kostenstelle == kostenstelle);
    }
}
