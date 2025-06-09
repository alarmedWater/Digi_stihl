using AutoMapper;
using Digi_Stihl.Models;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Entity ↔ DTO
            CreateMap<Employee, EmployeeDto>().ReverseMap();

            // später für weitere Paare:
            // CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();
            // CreateMap<FluctuationReport, FluctuationReportDto>().ReverseMap();

        }
    }
}
