// Repositories/ExitReasonRepository.cs
using Digi_Stihl.Data;
using Digi_Stihl.Models;
using Microsoft.EntityFrameworkCore;

namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Repository for managing exit reason data.
    /// </summary>
    public class ExitReasonRepository : IExitReasonRepository
    {
        private readonly ApplicationDbContext _db;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExitReasonRepository"/> class.
        /// </summary>
        /// <param name="db">The application database context.</param>
        public ExitReasonRepository(ApplicationDbContext db) => _db = db;

        /// <summary>
        /// Retrieves all exit reasons asynchronously.
        /// </summary>
        /// <returns>A list of all exit reasons.</returns>
        public async Task<IList<ExitReason>> GetAllAsync()
        {
            return await _db.ExitReasons.ToListAsync();
        }
    }
}