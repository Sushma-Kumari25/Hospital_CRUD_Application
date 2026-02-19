using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds.Dto;
using UserCrud.PatientAdmission.Dto;

namespace UserCrud.PatientAdmission
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<PatientAdmission, PatientAdmissionDto>();
            CreateMap<CreatePatientAdmissionDto, PatientAdmission>();
            CreateMap<UpdatePatientAdmissionDto, PatientAdmission>();
        }
    }
}
