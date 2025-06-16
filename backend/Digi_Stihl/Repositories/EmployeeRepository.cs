using Digi_Stihl.Data;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Microsoft.EntityFrameworkCore;

namespace Digi_Stihl.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _db;
        public EmployeeRepository(ApplicationDbContext db) => _db = db;

        public async Task AddAsync(Employee entity)
        {
            await _db.Employees.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Employee entity)
        {
            _db.Employees.Update(entity);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            var emp = await _db.Employees.FindAsync(id);
            if (emp != null)
            {
                _db.Employees.Remove(emp);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _db.Employees
                            .FirstOrDefaultAsync(e => e.EmployeeId == id);
        }

        public async Task<IList<Employee>> GetAllAsync()
        {
            return await _db.Employees.ToListAsync();
        }

        public async Task<IList<Employee>> GetFilteredAsync(EmployeeFilterDto f)
        {
            var q = _db.Employees
                    .Include(e => e.Department)
                    .Include(e => e.ExitReason)
                    .AsQueryable();

            if (!string.IsNullOrWhiteSpace(f.Name))
                q = q.Where(e => e.Name.Contains(f.Name));

            if (!string.IsNullOrWhiteSpace(f.Vorname))
                q = q.Where(e => e.Vorname.Contains(f.Vorname));

            if (f.EintrittFrom.HasValue)
                q = q.Where(e => e.Eintritt >= f.EintrittFrom.Value);

            if (f.EintrittTo.HasValue)
                q = q.Where(e => e.Eintritt <= f.EintrittTo.Value);

            if (!string.IsNullOrWhiteSpace(f.Funktion))
                q = q.Where(e => e.Funktion!.Contains(f.Funktion));

            if (!string.IsNullOrWhiteSpace(f.Kostenstelle))
                q = q.Where(e => e.Kostenstelle == f.Kostenstelle);

            // Bereich (Enum) filtern
            if (f.Bereich.HasValue)
                q = q.Where(e => e.Bereich == f.Bereich.Value);

            // Arbeitsverhaeltnis (Enum) filtern
            if (f.Arbeitsverhaeltnis.HasValue)
                q = q.Where(e => e.Arbeitsverhaeltnis == f.Arbeitsverhaeltnis.Value);

            // Optional: nach ExitReasonId filtern
            if (f.ExitReasonId.HasValue)
                q = q.Where(e => e.ExitReasonId == f.ExitReasonId.Value);

            if (f.MinFTE.HasValue)
                q = q.Where(e => e.FTE >= f.MinFTE.Value);

            if (f.MaxFTE.HasValue)
                q = q.Where(e => e.FTE <= f.MaxFTE.Value);

            return await q.ToListAsync();
        }
    }
}
