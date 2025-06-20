// Repositories/IExitReasonRepository.cs
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    public interface IExitReasonRepository
    {
        Task<IList<ExitReason>> GetAllAsync();
    }
}