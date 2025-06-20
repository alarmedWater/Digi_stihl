// Repositories/ExitReasonRepository.cs
using Digi_Stihl.Data;
using Digi_Stihl.Models;
using Microsoft.EntityFrameworkCore;

namespace Digi_Stihl.Repositories
{
    public class ExitReasonRepository : IExitReasonRepository
    {
        private readonly ApplicationDbContext _db;
        public ExitReasonRepository(ApplicationDbContext db) => _db = db;

        public async Task<IList<ExitReason>> GetAllAsync()
        {
            return await _db.ExitReasons.ToListAsync();
        }
    }
}