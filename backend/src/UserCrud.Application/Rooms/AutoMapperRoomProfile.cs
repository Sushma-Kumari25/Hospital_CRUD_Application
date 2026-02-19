using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Rooms
{
   public  class AutoMapperRoomProfile : AutoMapper.Profile
    {
        public AutoMapperRoomProfile()
        {
            CreateMap<Rooms, Dto.RoomDto>().ReverseMap();
            CreateMap<Dto.CreateRoomDto, Rooms>().ReverseMap();
            CreateMap<Dto.UpdateRoomDto, Rooms>().ReverseMap();
        }
    }
}
