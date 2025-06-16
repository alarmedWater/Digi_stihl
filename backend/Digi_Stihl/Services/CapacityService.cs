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
        private readonly IMapper _mapper;

        public CapacityService(ICapacityRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        public async Task<IList<CapacityDeviationDto>> GetDeviationsAsync(CapacityFilterDto filter)
        {
            var ents = await _repo.GetDeviationsAsync(filter);
            return _mapper.Map<IList<CapacityDeviationDto>>(ents);
        }

        public async Task<IList<CapacityDeviationDto>> CreateDeviationAsync(CreateCapacityDeviationDto dto)
        {
            var deviations = new List<CapacityDeviation>();
            int year = dto.StartYear, month = dto.StartMonth;
            while (year < dto.EndYear || (year == dto.EndYear && month <= dto.EndMonth))
            {
                deviations.Add(new CapacityDeviation
                {
                    EmployeeId     = dto.EmployeeId,
                    Year           = year,
                    Month          = month,
                    NeueKapazitaet = dto.NeueKapazitaet,
                    Bemerkung      = dto.Bemerkung
                });
                month++;
                if (month == 13) { month = 1; year++; }
            }

            var existing = await _repo.GetDeviationsAsync(new CapacityFilterDto
            {
                StartYear   = dto.StartYear,
                StartMonth  = dto.StartMonth,
                EndYear     = dto.EndYear,
                EndMonth    = dto.EndMonth
            });
            if (existing.Any())
                throw new InvalidOperationException("Für den Zeitraum existieren bereits Abweichungen.");

            await _repo.AddDeviationsAsync(deviations);
            return _mapper.Map<IList<CapacityDeviationDto>>(deviations);
        }

        public async Task<DirectCapacityOverviewDto> GetDirectCapacityOverviewAsync(int startYear, int startMonth)
        {
            return await BuildOverviewAsync(BereichTyp.Direkt, startYear, startMonth);
        }

        public async Task<IndirectCapacityOverviewDto> GetIndirectCapacityOverviewAsync(int startYear, int startMonth)
        {
            // Nutze dieselbe Logik, mappe aber auf Indirect DTO
            var directDto = await BuildOverviewAsync(BereichTyp.Indirekt, startYear, startMonth);
            return new IndirectCapacityOverviewDto
            {
                StartYear   = directDto.StartYear,
                StartMonth  = directDto.StartMonth,
                Departments = directDto.Departments
            };
        }

        private async Task<DirectCapacityOverviewDto> BuildOverviewAsync(BereichTyp bereich, int startYear, int startMonth)
        {
            var employees = await _repo.GetEmployeesByTypeAsync(bereich);
            var endDate   = DateTime.Today.AddMonths(23);
            var deviations = await _repo.GetDeviationsAsync(new CapacityFilterDto
            {
                StartYear   = startYear,
                StartMonth  = startMonth,
                EndYear     = endDate.Year,
                EndMonth    = endDate.Month
            });

            var dto = new DirectCapacityOverviewDto { StartYear = startYear, StartMonth = startMonth };
            for (int offset = 0; offset < 24; offset++)
            {
                var dt = new DateTime(startYear, startMonth, 1).AddMonths(offset);
                foreach (var grp in employees.GroupBy(e => e.Kostenstelle!))
                {
                    var depDto = dto.Departments.FirstOrDefault(d => d.DepartmentCode == grp.Key);
                    if (depDto == null)
                    {
                        depDto = new DepartmentCapacityOverviewDto
                        {
                            DepartmentCode = grp.Key,
                            DepartmentName = grp.First().Department!.Abteilungsname,
                            SubtotalFte    = new decimal[24],
                            HeadCount      = grp.Count(),
                            Employees      = new List<EmployeeCapacityDto>()
                        };
                        dto.Departments.Add(depDto);
                    }

                    foreach (var emp in grp)
                    {
                        var baseFte = emp.FTE;
                        var dev = deviations.SingleOrDefault(d =>
                            d.EmployeeId == emp.EmployeeId &&
                            d.Year       == dt.Year &&
                            d.Month      == dt.Month);
                        var cap = baseFte + (dev?.NeueKapazitaet ?? 0m);

                        var empDto = depDto.Employees.FirstOrDefault(e => e.EmployeeId == emp.EmployeeId);
                        if (empDto == null)
                        {
                            empDto = new EmployeeCapacityDto
                            {
                                EmployeeId = emp.EmployeeId,
                                Name       = $"{emp.Name}, {emp.Vorname}",
                                BaseFte    = emp.FTE,
                                Deviations = new decimal[24]
                            };
                            depDto.Employees.Add(empDto);
                        }

                        empDto.Deviations[offset] = cap;
                        depDto.SubtotalFte[offset] += cap;
                    }
                }
            }
            return dto;
        }
    }
}
