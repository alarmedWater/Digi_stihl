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
    public class CapacityService : ICapacityService
    {
        private readonly ICapacityRepository _repo;
        private readonly IMapper             _mapper;

        public CapacityService(ICapacityRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        public async Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter)
        {
            var entities = await _repo.GetDeviationsAsync(filter);
            return _mapper.Map<IList<CapacityDeviationDto>>(entities);
        }

        public async Task<CapacityDeviationDto?> GetDeviationByIdAsync(int id)
        {
            var entity = await _repo.GetDeviationByIdAsync(id);
            return entity == null
                ? null
                : _mapper.Map<CapacityDeviationDto>(entity);
        }

        public async Task<CapacityDeviationDto> CreateDeviationAsync(CreateCapacityDeviationDto dto)
        {
            var overlaps = await _repo.GetDeviationsAsync(new CapacityFilterDto
            {
                StartDate = dto.StartDate,
                EndDate   = dto.EndDate
            });
            if (overlaps.Any(d => d.EmployeeId == dto.EmployeeId))
                throw new InvalidOperationException("Für diesen Zeitraum existieren bereits Abweichungen.");

            var entity = _mapper.Map<CapacityDeviation>(dto);
            await _repo.AddDeviationAsync(entity);
            return _mapper.Map<CapacityDeviationDto>(entity);
        }

        public async Task<CapacityDeviationDto> UpdateDeviationAsync(int id, CreateCapacityDeviationDto dto)
        {
            var entity = await _repo.GetDeviationByIdAsync(id);
            if (entity == null)
                throw new KeyNotFoundException($"Deviation {id} nicht gefunden.");

            entity.StartDate      = dto.StartDate;
            entity.EndDate        = dto.EndDate;
            entity.NeueKapazitaet = dto.NeueKapazitaet;
            entity.Bemerkung      = dto.Bemerkung;

            await _repo.UpdateDeviationAsync(entity);
            return _mapper.Map<CapacityDeviationDto>(entity);
        }

        public Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth)
            => BuildOverviewAsync(BereichTyp.Direkt, startYear, startMonth);

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
                        var baseFte = emp.FTE;
                        var dev = deviations.FirstOrDefault(d =>
                            d.EmployeeId == emp.EmployeeId &&
                            d.StartDate   <= monthDate &&
                            d.EndDate     >= monthDate);
                        var cap = baseFte + (dev?.NeueKapazitaet ?? 0m);

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

        public async Task DeleteDeviationAsync(int id)
        {
            await _repo.DeleteDeviationAsync(id);
        }
    }

    public static class CollectionExtensions
    {
        public static T Also<T>(this T obj, Action<T> act)
        {
            act(obj);
            return obj;
        }
    }
}
