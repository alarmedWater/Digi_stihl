// Repositories/ICapacityRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;

namespace Digi_Stihl.Repositories
{
    public interface ICapacityRepository
    {
        /// <summary>
        /// Holen von Kapazitätsabweichungen anhand von Filtern.
        /// </summary>
        Task<IList<CapacityDeviation>> GetDeviationsAsync(CapacityFilterDto filter);

        /// <summary>
        /// Speichern mehrerer Kapazitätsabweichungen (Bulk-Insert).
        /// </summary>
        Task AddDeviationsAsync(IEnumerable<CapacityDeviation> deviations);

        /// <summary>
        /// Holen aller Mitarbeiter eines Bereichs (direkt/indirekt).
        /// </summary>
        Task<IList<Employee>> GetEmployeesByTypeAsync(BereichTyp bereich);
    }
}