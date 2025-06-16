// Repositories/CapacityRepository.cs
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Digi_Stihl.Data;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    public class CapacityRepository : ICapacityRepository
    {
        private readonly ApplicationDbContext _db;
        public CapacityRepository(ApplicationDbContext db) => _db = db;

        public async Task<IList<CapacityDeviation>> GetDeviationsAsync(CapacityFilterDto f)
        {
            var q = _db.CapacityDeviations.AsQueryable();

            if (!string.IsNullOrWhiteSpace(f.EmployeeName))
                q = q.Where(cd => cd.Employee!.Name.Contains(f.EmployeeName!));

            if (f.StartYear.HasValue && f.StartMonth.HasValue)
                q = q.Where(cd => cd.Year > f.StartYear! ||
                    (cd.Year == f.StartYear! && cd.Month >= f.StartMonth!));

            if (f.EndYear.HasValue && f.EndMonth.HasValue)
                q = q.Where(cd => cd.Year < f.EndYear! ||
                    (cd.Year == f.EndYear! && cd.Month <= f.EndMonth!));

            if (!string.IsNullOrWhiteSpace(f.DepartmentCode))
                q = q.Where(cd => cd.Employee!.Kostenstelle == f.DepartmentCode);

            return await q
                .Include(cd => cd.Employee)
                .ToListAsync();
        }

        public async Task AddDeviationsAsync(IEnumerable<CapacityDeviation> deviations)
        {
            await _db.CapacityDeviations.AddRangeAsync(deviations);
            await _db.SaveChangesAsync();
        }

        public async Task<IList<Employee>> GetEmployeesByTypeAsync(BereichTyp bereich)
        {
            return await _db.Employees
                .Where(e => e.Bereich == bereich)
                .Include(e => e.Department)
                .ToListAsync();
        }
    }
}
