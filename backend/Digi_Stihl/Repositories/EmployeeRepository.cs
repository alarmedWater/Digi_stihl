namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Repository for managing employee data.
    /// </summary>
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _db;

        /// <summary>
        /// Initializes a new instance of the <see cref="EmployeeRepository"/> class.
        /// </summary>
        /// <param name="db">The application database context.</param>
        public EmployeeRepository(ApplicationDbContext db) => _db = db;

        /// <summary>
        /// Adds a new employee entity to the database.
        /// </summary>
        /// <param name="entity">The employee entity to add.</param>
        public async Task AddAsync(Employee entity)
        {
            await _db.Employees.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Updates an existing employee entity in the database.
        /// </summary>
        /// <param name="entity">The employee entity to update.</param>
        public async Task UpdateAsync(Employee entity)
        {
            _db.Employees.Update(entity);
            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes an employee by their ID from the database.
        /// </summary>
        /// <param name="id">The ID of the employee to delete.</param>
        public async Task DeleteByIdAsync(int id)
        {
            var emp = await _db.Employees.FindAsync(id);
            if (emp != null)
            {
                _db.Employees.Remove(emp);
                await _db.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Retrieves an employee by their ID.
        /// </summary>
        /// <param name="id">The ID of the employee to retrieve.</param>
        /// <returns>The employee if found, otherwise null.</returns>
        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _db.Employees
                            .FirstOrDefaultAsync(e => e.EmployeeId == id);
        }

        /// <summary>
        /// Retrieves all employees.
        /// </summary>
        /// <returns>A list of all employees.</returns>
        public async Task<IList<Employee>> GetAllAsync()
        {
            return await _db.Employees.ToListAsync();
        }

        /// <summary>
        /// Retrieves a filtered list of employees based on the provided criteria.
        /// </summary>
        /// <param name="f">The filter criteria.</param>
        /// <returns>A list of employees matching the filter criteria.</returns>
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

            // Filter by Bereich (Enum)
            if (f.Bereich.HasValue)
                q = q.Where(e => e.Bereich == f.Bereich.Value);

            // Filter by Arbeitsverhaeltnis (Enum)
            if (f.Arbeitsverhaeltnis.HasValue)
                q = q.Where(e => e.Arbeitsverhaeltnis == f.Arbeitsverhaeltnis.Value);

            // Optional: Filter by ExitReasonId
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
