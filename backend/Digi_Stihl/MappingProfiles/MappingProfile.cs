using AutoMapper;
using Digi_Stihl.Models;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Entity ↔ DTO
            CreateMap<Employee, EmployeeDto>().ReverseMap();

            // MappingProfiles/MappingProfile.cs
            CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();

            // später für weitere Paare:
            // CreateMap<FluctuationReport, FluctuationReportDto>().ReverseMap();

        }
    }
}
