
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
        Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter);
        Task<CapacityDeviationDto> CreateDeviationAsync(CreateCapacityDeviationDto dto);
        Task<CapacityDeviationDto?> GetDeviationByIdAsync(int id);
        Task<CapacityDeviationDto> UpdateDeviationAsync(int id, CreateCapacityDeviationDto dto);
        Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth);
        Task<IndirectCapacityOverviewDto> GetIndirectCapacityOverviewAsync(int startYear, int startMonth);
        Task DeleteDeviationAsync(int id);
    }
}
