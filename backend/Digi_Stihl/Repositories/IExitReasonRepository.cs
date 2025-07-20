// Repositories/IExitReasonRepository.cs
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    /// <summary>
    /// Defines the contract for a repository handling exit reason data.
    /// </summary>
    public interface IExitReasonRepository
    {
        /// <summary>
        /// Retrieves all exit reasons asynchronously.
        /// </summary>
        /// <returns>A list of all exit reasons.</returns>
        Task<IList<ExitReason>> GetAllAsync();
    }
}