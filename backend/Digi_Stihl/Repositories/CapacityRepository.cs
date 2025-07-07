// Repositories/CapacityRepository.cs
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Digi_Stihl.Data;
using Digi_Stihl.Models;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Repositories
{
    public class CapacityRepository : ICapacityRepository
    {
        private readonly ApplicationDbContext _db;

        public CapacityRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Liefert alle Abweichungen gemäß Filter (inkl. Employee-Navigation).
        /// </summary>
        public async Task<IList<CapacityDeviation>> GetDeviationsAsync(CapacityFilterDto filter)
        {
            var query = _db.CapacityDeviations.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.EmployeeName))
                query = query.Where(cd =>
                    cd.Employee != null &&
                    EF.Functions.Like(cd.Employee.Name, $"%{filter.EmployeeName}%"));

            if (filter.StartDate.HasValue)
                query = query.Where(cd => cd.EndDate >= filter.StartDate.Value);

            if (filter.EndDate.HasValue)
                query = query.Where(cd => cd.StartDate <= filter.EndDate.Value);

            if (!string.IsNullOrWhiteSpace(filter.DepartmentCode))
                query = query.Where(cd =>
                    cd.Employee != null &&
                    cd.Employee.Kostenstelle == filter.DepartmentCode);

            return await query
                .Include(cd => cd.Employee)
                .ToListAsync();
        }

        /// <summary>
        /// Fügt eine neue Abweichung hinzu und speichert sie.
        /// </summary>
        public async Task AddDeviationAsync(CapacityDeviation deviation)
        {
            _db.CapacityDeviations.Add(deviation);
            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Holt eine einzelne Abweichung per Primärschlüssel (inkl. Employee).
        /// </summary>
        public async Task<CapacityDeviation?> GetDeviationByIdAsync(int id)
        {
            return await _db.CapacityDeviations
                .Include(cd => cd.Employee)
                .FirstOrDefaultAsync(cd => cd.CapacityDeviationId == id);
        }

        /// <summary>
        /// Aktualisiert eine bestehende Abweichung und speichert die Änderungen.
        /// </summary>
        public async Task UpdateDeviationAsync(CapacityDeviation deviation)
        {
            _db.CapacityDeviations.Update(deviation);
            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Löscht die Abweichung mit der angegebenen ID.
        /// </summary>
        public async Task DeleteDeviationAsync(int id)
        {
            var entity = await _db.CapacityDeviations.FindAsync(id);
            if (entity == null)
                return;

            _db.CapacityDeviations.Remove(entity);
            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Liefert alle Mitarbeiter eines bestimmten Bereichs (inkl. Department-Navigation).
        /// </summary>
        public async Task<IList<Employee>> GetEmployeesByTypeAsync(BereichTyp bereich)
        {
            return await _db.Employees
                .Where(e => e.Bereich == bereich)
                .Include(e => e.Department)
                .ToListAsync();
        }
    }
}