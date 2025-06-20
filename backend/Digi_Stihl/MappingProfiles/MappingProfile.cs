// MappingProfiles/MappingProfile.cs
using AutoMapper;
using Digi_Stihl.Models;
using Digi_Stihl.DTOs;

namespace Digi_Stihl.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // ─── Abteilung ─────────────────────────────────────────
            CreateMap<Department, DepartmentDto>();

            // ─── Employee → EmployeeDto ─────────────────────────────
            CreateMap<Employee, EmployeeDto>()
                // navigiere zur Abteilung
                .ForMember(dest => dest.Department,
                           opt => opt.MapFrom(src => src.Department))
                // alle übrigen Felder mit identischem Namen mappt AutoMapper automatisch
            ;

            // ─── EmployeeCreateDto → Employee ──────────────────────
            CreateMap<EmployeeCreateDto, Employee>()
                // ID wird von der DB gesetzt, GUID erzeugt im Service
                .ForMember(dest => dest.EmployeeId,      opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeGuid,    opt => opt.Ignore())
                // ExitReasonId beim Anlegen nicht über CreateDto gesetzt
                .ForMember(dest => dest.ExitReasonId,    opt => opt.Ignore())
                // Verlaengerung1/2, BefristungMax, Freistellung nicht aus CreateDto abgebildet
                .ForMember(dest => dest.Verlaengerung1,  opt => opt.Ignore())
                .ForMember(dest => dest.Verlaengerung2,  opt => opt.Ignore())
                .ForMember(dest => dest.BefristungMax,   opt => opt.Ignore())
                .ForMember(dest => dest.Freistellung,    opt => opt.Ignore())
            ;

            // ─── EmployeeDto → Employee ─────────────────────────────
            CreateMap<EmployeeDto, Employee>()
                // übernehme PK
                .ForMember(dest => dest.EmployeeGuid,    opt => opt.Ignore())
                // navigiere Abteilung via Kostenstelle
                .ForMember(dest => dest.Department,      opt => opt.Ignore())
                // alle übrigen identischen Felder automap
            ;

            // ─── CapacityDeviation ↔ CapacityDeviationDto ───────────
            CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();

            // …weitere Mappings
        }
    }
}
