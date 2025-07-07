// MappingProfiles/MappingProfile.cs
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;

namespace Digi_Stihl.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // ─── CreateCapacityDeviationDto → CapacityDeviation ────
            CreateMap<CreateCapacityDeviationDto, CapacityDeviation>()
                .ForMember(dest => dest.StartDate,      opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate,        opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.NeueKapazitaet, opt => opt.MapFrom(src => src.NeueKapazitaet))
                .ForMember(dest => dest.Bemerkung,      opt => opt.MapFrom(src => src.Bemerkung));

            // ─── CapacityDeviation ↔ CapacityDeviationDto ───────────
            CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();

            // ─── Department ─────────────────────────────────────────
            CreateMap<Department, DepartmentDto>().ReverseMap();

            // ─── ExitReason ─────────────────────────────────────────
            CreateMap<ExitReason, ExitReasonDto>().ReverseMap();

            // ─── Employee → EmployeeDto ─────────────────────────────
            CreateMap<Employee, EmployeeDto>()
                .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Department))
                .ForMember(dest => dest.ExitReason, opt => opt.MapFrom(src => src.ExitReason));

            // ─── EmployeeCreateDto → Employee ──────────────────────
            CreateMap<EmployeeCreateDto, Employee>()
                .ForMember(dest => dest.EmployeeId,    opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeGuid, opt => opt.Ignore())
                .ForMember(dest => dest.ExitReasonId, opt => opt.MapFrom(src => src.ExitReasonId))
                .ForMember(dest => dest.Department,   opt => opt.Ignore())
                .ForMember(dest => dest.Verlaengerung1, opt => opt.Ignore())
                .ForMember(dest => dest.Verlaengerung2, opt => opt.Ignore())
                .ForMember(dest => dest.BefristungMax,  opt => opt.Ignore())
                .ForMember(dest => dest.Freistellung,   opt => opt.Ignore());

            // ─── EmployeeDto → Employee ─────────────────────────────
            CreateMap<EmployeeDto, Employee>()
                .ForMember(dest => dest.EmployeeGuid, opt => opt.Ignore())
                .ForMember(dest => dest.Department,   opt => opt.Ignore())
                .ForMember(dest => dest.ExitReason,   opt => opt.Ignore());
        }
    }
}
