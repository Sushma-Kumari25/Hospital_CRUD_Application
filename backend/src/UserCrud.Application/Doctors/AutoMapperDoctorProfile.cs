using AutoMapper;
using UserCrud.Doctors.Dto;

namespace UserCrud.Doctors
{
    public class AutoMapperDoctorProfile : Profile
    {
        public AutoMapperDoctorProfile()
        {
            CreateMap<Doctor, DoctorsDto>();

            CreateMap<CreateDoctorsDto, Doctor>()
                .ForMember(d => d.Photo1Path, opt => opt.Ignore())
                .ForMember(d => d.Photo2Path, opt => opt.Ignore());

            CreateMap<UpdateDoctorsDto, Doctor>()
                .ForMember(d => d.Photo1Path, opt => opt.Ignore())
                .ForMember(d => d.Photo2Path, opt => opt.Ignore())
                .ForMember(d => d.Id, opt => opt.Ignore());
        }
    }
}
