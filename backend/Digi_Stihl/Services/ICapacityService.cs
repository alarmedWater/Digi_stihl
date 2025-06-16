// Services/ICapacityService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    public interface ICapacityService
    {
        /// <summary>
        /// Liefert Abweichungen nach Filter
        /// </summary>
        Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter);

        /// <summary>
        /// Legt neue Abweichungen an (Perioden aus CreateDto werden zu Monatsdatensätzen)
        /// </summary>
        Task<IList<CapacityDeviationDto>> CreateDeviationAsync(CreateCapacityDeviationDto dto);

        /// <summary>
        /// Direkte Kapazitätsübersicht (24 Monate ab Start)
        /// </summary>
        Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth);

        /// <summary>
        /// Indirekte Kapazitätsübersicht (24 Monate ab Start)
        /// </summary>
        Task<IndirectCapacityOverviewDto> GetIndirectCapacityOverviewAsync(int startYear, int startMonth);
    }
}