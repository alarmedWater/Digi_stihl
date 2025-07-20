// MappingProfiles/MappingProfile.cs
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;

namespace Digi_Stihl.MappingProfiles
{
    /// <summary>
    /// Configures AutoMapper profiles for mapping between models and DTOs.
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            /// <summary>
            /// Maps from the DTO for creating a capacity deviation to the CapacityDeviation model.
            /// </summary>
            CreateMap<CreateCapacityDeviationDto, CapacityDeviation>()
                .ForMember(dest => dest.StartDate,      opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate,        opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.NeueKapazitaet, opt => opt.MapFrom(src => src.NeueKapazitaet))
                .ForMember(dest => dest.Bemerkung,      opt => opt.MapFrom(src => src.Bemerkung));

            /// <summary>
            /// Defines a bidirectional mapping between the CapacityDeviation model and its DTO.
            /// </summary>
            CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();

            /// <summary>
            /// Defines a bidirectional mapping between the Department model and its DTO.
            /// </summary>
            CreateMap<Department, DepartmentDto>().ReverseMap();

            /// <summary>
            /// Defines a bidirectional mapping between the ExitReason model and its DTO.
            /// </summary>
            CreateMap<ExitReason, ExitReasonDto>().ReverseMap();

            /// <summary>
            /// Maps from the Employee model to its DTO, including related Department and ExitReason objects.
            /// </summary>
            CreateMap<Employee, EmployeeDto>()
                .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Department))
                .ForMember(dest => dest.ExitReason, opt => opt.MapFrom(src => src.ExitReason));

            /// <summary>
            /// Maps from the DTO for creating an employee to the Employee model, ignoring properties that are generated or should not be set on creation.
            /// </summary>
            CreateMap<EmployeeCreateDto, Employee>()
                .ForMember(dest => dest.EmployeeId,    opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeGuid, opt => opt.Ignore())
                .ForMember(dest => dest.ExitReasonId, opt => opt.MapFrom(src => src.ExitReasonId))
                .ForMember(dest => dest.Department,   opt => opt.Ignore())
                .ForMember(dest => dest.Verlaengerung1, opt => opt.Ignore())
                .ForMember(dest => dest.Verlaengerung2, opt => opt.Ignore())
                .ForMember(dest => dest.BefristungMax,  opt => opt.Ignore())
                .ForMember(dest => dest.Freistellung,   opt => opt.Ignore());

            /// <summary>
            /// Maps from the Employee DTO to the Employee model, ignoring properties that should not be updated from the DTO.
            /// </summary>
            CreateMap<EmployeeDto, Employee>()
                .ForMember(dest => dest.EmployeeGuid, opt => opt.Ignore())
                .ForMember(dest => dest.Department,   opt => opt.Ignore())
                .ForMember(dest => dest.ExitReason,   opt => opt.Ignore());
        }
    }
}
