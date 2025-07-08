// Services/ICapacityService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    /// <summary>
    /// Definiert die Operationen für das Management von Kapazitätsabweichungen.
    /// </summary>
    public interface ICapacityService
    {
        /// <summary>
        /// Liefert alle Kapazitätsabweichungen entsprechend der übergebenen Filterkriterien.
        /// </summary>
        Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter);

        /// <summary>
        /// Legt eine neue Kapazitätsabweichung an.
        /// </summary>
        Task<CapacityDeviationDto> CreateDeviationAsync(CreateCapacityDeviationDto dto);

        /// <summary>
        /// Holt eine einzelne Kapazitätsabweichung anhand ihrer ID.
        /// </summary>
        Task<CapacityDeviationDto?> GetDeviationByIdAsync(int id);

        /// <summary>
        /// Aktualisiert eine bestehende Kapazitätsabweichung.
        /// </summary>
        Task<CapacityDeviationDto> UpdateDeviationAsync(int id, CreateCapacityDeviationDto dto);

        /// <summary>
        /// Erstellt eine Übersicht der direkten Kapazitäten für 24 Monate ab dem angegebenen Startzeitpunkt.
        /// </summary>
        Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth);

        /// <summary>
        /// Erstellt eine Übersicht der indirekten Kapazitäten für 24 Monate ab dem angegebenen Startzeitpunkt.
        /// </summary>
        Task<IndirectCapacityOverviewDto> GetIndirectCapacityOverviewAsync(int startYear, int startMonth);

        /// <summary>
        /// Löscht eine Kapazitätsabweichung anhand ihrer ID.
        /// </summary>
        Task DeleteDeviationAsync(int id);
    }
}
