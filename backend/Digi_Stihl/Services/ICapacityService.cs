// Services/ICapacityService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Services
{
    /// <summary>
    /// Defines the operations for managing capacity deviations.
    /// </summary>
    public interface ICapacityService
    {
        /// <summary>
        /// Retrieves all capacity deviations according to the provided filter criteria.
        /// </summary>
        /// <param name="filter">The filter criteria for capacity deviations.</param>
        /// <returns>A list of capacity deviation DTOs.</returns>
        Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter);

        /// <summary>
        /// Creates a new capacity deviation.
        /// </summary>
        /// <param name="dto">The DTO containing data for the new capacity deviation.</param>
        /// <returns>The created capacity deviation DTO.</returns>
        Task<CapacityDeviationDto> CreateDeviationAsync(CreateCapacityDeviationDto dto);

        /// <summary>
        /// Retrieves a single capacity deviation by its ID.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to retrieve.</param>
        /// <returns>The capacity deviation DTO if found, otherwise null.</returns>
        Task<CapacityDeviationDto?> GetDeviationByIdAsync(int id);

        /// <summary>
        /// Updates an existing capacity deviation.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to update.</param>
        /// <param name="dto">The DTO containing updated data for the capacity deviation.</param>
        /// <returns>The updated capacity deviation DTO.</returns>
        Task<CapacityDeviationDto> UpdateDeviationAsync(int id, CreateCapacityDeviationDto dto);

        /// <summary>
        /// Creates an overview of direct capacities for 24 months starting from the specified time.
        /// </summary>
        /// <param name="startYear">The starting year for the overview.</param>
        /// <param name="startMonth">The starting month for the overview.</param>
        /// <returns>A DTO containing the direct capacity overview.</returns>
        Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth);

        /// <summary>
        /// Creates an overview of indirect capacities for 24 months starting from the specified time.
        /// </summary>
        /// <param name="startYear">The starting year for the overview.</param>
        /// <param name="startMonth">The starting month for the overview.</param>
        /// <returns>A DTO containing the indirect capacity overview.</returns>
        Task<IndirectCapacityOverviewDto> GetIndirectCapacityOverviewAsync(int startYear, int startMonth);

        /// <summary>
        /// Deletes a capacity deviation by its ID.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to delete.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task DeleteDeviationAsync(int id);
    }
}
