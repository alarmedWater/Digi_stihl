// Digi_Stihl/Repositories/DepartmentRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Digi_Stihl.Data;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Repository for managing department data.
    /// </summary>
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _ctx;

        /// <summary>
        /// Initializes a new instance of the <see cref="DepartmentRepository"/> class.
        /// </summary>
        /// <param name="ctx">The application database context.</param>
        public DepartmentRepository(ApplicationDbContext ctx) => _ctx = ctx;

        /// <summary>
        /// Retrieves all departments asynchronously.
        /// </summary>
        /// <returns>A list of all departments.</returns>
        public async Task<IList<Department>> GetAllAsync()
            => await _ctx.Departments
                         .AsNoTracking()
                         .ToListAsync();

        /// <summary>
        /// Retrieves a department by its cost center asynchronously.
        /// </summary>
        /// <param name="kostenstelle">The cost center of the department.</param>
        /// <returns>The department if found, otherwise null.</returns>
        public async Task<Department?> GetByKeyAsync(string kostenstelle)
            => await _ctx.Departments
                         .AsNoTracking()
                         .FirstOrDefaultAsync(d => d.Kostenstelle == kostenstelle);
    }
}
