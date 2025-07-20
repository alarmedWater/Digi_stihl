// Services/CapacityService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Repositories;

namespace Digi_Stihl.Services
{
    /// <summary>
    /// Provides services for managing capacity deviations and overviews.
    /// </summary>
    public class CapacityService : ICapacityService
    {
        private readonly ICapacityRepository _repo;
        private readonly IMapper             _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="CapacityService"/> class.
        /// </summary>
        /// <param name="repo">The capacity repository.</param>
        /// <param name="mapper">The AutoMapper instance.</param>
        public CapacityService(ICapacityRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of capacity deviations based on the provided filter criteria.
        /// </summary>
        /// <param name="filter">The filter criteria for capacity deviations.</param>
        /// <returns>A list of capacity deviation DTOs.</returns>
        public async Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter)
        {
            var entities = await _repo.GetDeviationsAsync(filter);
            return _mapper.Map<IList<CapacityDeviationDto>>(entities);
        }

        /// <summary>
        /// Retrieves a single capacity deviation by its ID.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to retrieve.</param>
        /// <returns>The capacity deviation DTO if found, otherwise null.</returns>
        public async Task<CapacityDeviationDto?> GetDeviationByIdAsync(int id)
        {
            var entity = await _repo.GetDeviationByIdAsync(id);
            return entity == null
                ? null
                : _mapper.Map<CapacityDeviationDto>(entity);
        }

        /// <summary>
        /// Creates a new capacity deviation.
        /// </summary>
        /// <param name="dto">The DTO containing data for the new capacity deviation.</param>
        /// <returns>The created capacity deviation DTO.</returns>
        /// <exception cref="InvalidOperationException">Thrown if an overlapping deviation already exists for the employee and time period.</exception>
        public async Task<CapacityDeviationDto> CreateDeviationAsync(CreateCapacityDeviationDto dto)
        {
            var overlaps = await _repo.GetDeviationsAsync(new CapacityFilterDto
            {
                StartDate = dto.StartDate,
                EndDate   = dto.EndDate
            });
            if (overlaps.Any(d => d.EmployeeId == dto.EmployeeId))
                throw new InvalidOperationException("An overlapping deviation already exists for this period.");

            var entity = _mapper.Map<CapacityDeviation>(dto);
            await _repo.AddDeviationAsync(entity);
            return _mapper.Map<CapacityDeviationDto>(entity);
        }

        /// <summary>
        /// Updates an existing capacity deviation.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to update.</param>
        /// <param name="dto">The DTO containing updated data for the capacity deviation.</param>
        /// <returns>The updated capacity deviation DTO.</returns>
        /// <exception cref="KeyNotFoundException">Thrown if the deviation with the specified ID is not found.</exception>
        public async Task<CapacityDeviationDto> UpdateDeviationAsync(int id, CreateCapacityDeviationDto dto)
        {
            var entity = await _repo.GetDeviationByIdAsync(id);
            if (entity == null)
                throw new KeyNotFoundException($"Deviation {id} not found.");

            // Overwrite values
            entity.StartDate      = dto.StartDate;
            entity.EndDate        = dto.EndDate;
            entity.NeueKapazitaet = dto.NeueKapazitaet;
            entity.Bemerkung      = dto.Bemerkung;

            await _repo.UpdateDeviationAsync(entity);
            return _mapper.Map<CapacityDeviationDto>(entity);
        }

        /// <summary>
        /// Retrieves the direct capacity overview for a specified year and month.
        /// </summary>
        /// <param name="startYear">The starting year for the overview.</param>
        /// <param name="startMonth">The starting month for the overview.</param>
        /// <returns>A DTO containing the direct capacity overview.</returns>
        public Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth)
            => BuildOverviewAsync(BereichTyp.Direkt, startYear, startMonth);

        /// <summary>
        /// Retrieves the indirect capacity overview for a specified year and month.
        /// </summary>
        /// <param name="startYear">The starting year for the overview.</param>
        /// <param name="startMonth">The starting month for the overview.</param>
        /// <returns>A DTO containing the indirect capacity overview.</returns>
        public async Task<IndirectCapacityOverviewDto> GetIndirectCapacityOverviewAsync(int startYear, int startMonth)
        {
            var direct = await BuildOverviewAsync(BereichTyp.Indirekt, startYear, startMonth);
            return new IndirectCapacityOverviewDto
            {
                StartYear   = direct.StartYear,
                StartMonth  = direct.StartMonth,
                Departments = direct.Departments
            };
        }

        /// <summary>
        /// Builds a capacity overview for a given employee type, starting year, and month.
        /// </summary>
        /// <param name="bereich">The type of employee area (Direct or Indirect).</param>
        /// <param name="startYear">The starting year for the overview.</param>
        /// <param name="startMonth">The starting month for the overview.</param>
        /// <returns>A DTO containing the capacity overview.</returns>
        private async Task<DirectCapacityOverviewDto> BuildOverviewAsync(BereichTyp bereich, int startYear, int startMonth)
        {
            var employees  = await _repo.GetEmployeesByTypeAsync(bereich);
            var startDate  = new DateTime(startYear, startMonth, 1);
            var deviations = await _repo.GetDeviationsAsync(new CapacityFilterDto
            {
                StartDate = startDate,
                EndDate   = startDate.AddMonths(23)
            });

            var overview = new DirectCapacityOverviewDto
            {
                StartYear  = startYear,
                StartMonth = startMonth
            };

            for (int offset = 0; offset < 24; offset++)
            {
                var monthDate = startDate.AddMonths(offset);

                foreach (var grp in employees.GroupBy(e => e.Kostenstelle!))
                {
                    var depDto = overview.Departments
                        .FirstOrDefault(d => d.DepartmentCode == grp.Key)
                        ?? new DepartmentCapacityOverviewDto
                        {
                            DepartmentCode = grp.Key,
                            DepartmentName = grp.First().Department!.Abteilungsname,
                            SubtotalFte    = new decimal[24],
                            HeadCount      = grp.Count(),
                            Employees      = new List<EmployeeCapacityDto>()
                        }.Also(d => overview.Departments.Add(d));

                    foreach (var emp in grp)
                    {
                        var dev = deviations.FirstOrDefault(d =>
                            d.EmployeeId == emp.EmployeeId &&
                            d.StartDate   <= monthDate &&
                            d.EndDate     >= monthDate);

                        // If there's a deviation, use the new capacity; otherwise, use the base FTE.
                        var cap = dev != null
                            ? dev.NeueKapazitaet
                            : emp.FTE;

                        var empDto = depDto.Employees
                            .FirstOrDefault(e => e.EmployeeId == emp.EmployeeId)
                            ?? new EmployeeCapacityDto
                            {
                                EmployeeId = emp.EmployeeId,
                                Name       = $"{emp.Name}, {emp.Vorname}",
                                BaseFte    = emp.FTE,
                                Deviations = new decimal[24]
                            }.Also(e => depDto.Employees.Add(e));

                        empDto.Deviations[offset] = cap;
                        depDto.SubtotalFte[offset] += cap;
                    }
                }
            }

            return overview;
        }

        /// <summary>
        /// Deletes a capacity deviation by its ID.
        /// </summary>
        /// <param name="id">The ID of the capacity deviation to delete.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        public async Task DeleteDeviationAsync(int id)
        {
            await _repo.DeleteDeviationAsync(id);
        }
    }

    /// <summary>
    /// Provides extension methods for collections.
    /// </summary>
    public static class CollectionExtensions
    {
        /// <summary>
        /// Executes an action on an object and then returns the object. Useful for fluent API calls.
        /// </summary>
        /// <typeparam name="T">The type of the object.</typeparam>
        /// <param name="obj">The object to perform the action on.</param>
        /// <param name="act">The action to perform.</param>
        /// <returns>The object itself, after the action has been performed.</returns>
        public static T Also<T>(this T obj, Action<T> act)
        {
            act(obj);
            return obj;
        }
    }
}
