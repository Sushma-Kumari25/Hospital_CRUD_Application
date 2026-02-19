using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds.Dto;

namespace UserCrud.Beds
{
    internal class BedAutoMapperProfile : Profile
    {
        public BedAutoMapperProfile()
        {
            CreateMap<Bed, BedDto>();
            CreateMap<CreateBedDto, Bed>(); 
            CreateMap<UpdateBedDto, Bed>();
        }
    }
}
