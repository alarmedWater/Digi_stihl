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
            // ─── Department ─────────────────────────────────────────
            CreateMap<Department, DepartmentDto>().ReverseMap();

            // ─── ExitReason ─────────────────────────────────────────
            CreateMap<ExitReason, ExitReasonDto>().ReverseMap();

            // ─── Employee → EmployeeDto ─────────────────────────────
            CreateMap<Employee, EmployeeDto>()
                // Abteilung als DTO
                .ForMember(dest => dest.Department,
                           opt => opt.MapFrom(src => src.Department))
                // Austrittsgrund als DTO
                .ForMember(dest => dest.ExitReason,
                           opt => opt.MapFrom(src => src.ExitReason))
                // alle anderen gleichnamigen Felder automatisch
                ;

            // ─── EmployeeCreateDto → Employee ──────────────────────
            CreateMap<EmployeeCreateDto, Employee>()
                // EmployeeId / Guid generiert das Backend
                .ForMember(dest => dest.EmployeeId, opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeGuid, opt => opt.Ignore())
                // ExitReasonId wird aus CreateDto übernommen
                .ForMember(dest => dest.ExitReasonId,
                           opt => opt.MapFrom(src => src.ExitReasonId))
                // Department navigational property wird über Kostenstelle gesetzt
                .ForMember(dest => dest.Department, opt => opt.Ignore())
                // die nicht im CreateDto vorhandenen Felder ignorieren
                .ForMember(dest => dest.Verlaengerung1, opt => opt.Ignore())
                .ForMember(dest => dest.Verlaengerung2, opt => opt.Ignore())
                .ForMember(dest => dest.BefristungMax, opt => opt.Ignore())
                .ForMember(dest => dest.Freistellung, opt => opt.Ignore())
            ;

            // ─── EmployeeDto → Employee ─────────────────────────────
            CreateMap<EmployeeDto, Employee>()
                // EmployeeGuid oder Department nicht überschreiben
                .ForMember(dest => dest.EmployeeGuid, opt => opt.Ignore())
                .ForMember(dest => dest.Department, opt => opt.Ignore())
                // ExitReason navigational property wird über ExitReasonId gesetzt
                .ForMember(dest => dest.ExitReason, opt => opt.Ignore())
                // alle anderen gleichnamigen Felder automatisch
                ;

            // ─── CapacityDeviation ↔ CapacityDeviationDto ───────────
            CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();

            // ─── ExitReason ↔ ExitreasonDto ───────────
            CreateMap<ExitReason, ExitReasonDto>().ReverseMap();
        }
    }
}
