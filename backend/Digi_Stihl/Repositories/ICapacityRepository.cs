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
        /// Speichern einer einzelnen Kapazitätsabweichung.
        /// </summary>
        Task AddDeviationAsync(CapacityDeviation deviation);

        /// <summary>
        /// Holt eine einzelne Abweichung per Primärschlüssel.
        /// </summary>
        Task<CapacityDeviation?> GetDeviationByIdAsync(int id);

        /// <summary>
        /// Aktualisiert eine bestehende Kapazitätsabweichung.
        /// </summary>
        Task UpdateDeviationAsync(CapacityDeviation deviation);

        /// <summary>
        /// Löscht die Kapazitätsabweichung mit der angegebenen ID.
        /// </summary>
        Task DeleteDeviationAsync(int id);

        /// <summary>
        /// Holen aller Mitarbeiter eines Bereichs (direkt/indirekt).
        /// </summary>
        Task<IList<Employee>> GetEmployeesByTypeAsync(BereichTyp bereich);
    }
}
