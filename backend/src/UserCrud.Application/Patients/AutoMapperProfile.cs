using AutoMapper;
using UserCrud.Patients.Dto;
using System;

namespace UserCrud.Patients
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // =================== Patient -> PatientsDto ===================
            CreateMap<Patient, PatientsDto>()
                .ForMember(dest => dest.DateOfBirthString,
                           opt => opt.MapFrom(src => src.DateOfBirth.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.CreatedAtString,
                           opt => opt.MapFrom(src => src.CreationTime.ToString("yyyy-MM-dd HH:mm:ss")))
                .ForMember(dest => dest.Gender,
                           opt => opt.MapFrom(src => src.Gender.ToString())); // Enum to string

            // =================== PatientsDto -> Patient ===================
            CreateMap<PatientsDto, Patient>()
                .ForMember(dest => dest.DateOfBirth, opt => opt.Ignore()) // Prevent overwriting DateTime from string
                .ForMember(dest => dest.CreationTime, opt => opt.Ignore()); // Read-only

            // =================== CreatePatientsDto -> Patient ===================
            CreateMap<CreatePatientsDto, Patient>();

            // =================== UpdatePatientsDto -> Patient ===================
            CreateMap<UpdatePatientsDto, Patient>();
        }
    }
}
