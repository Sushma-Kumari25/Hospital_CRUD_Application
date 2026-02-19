using Abp.Application.Services;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Doctors.Dto;
using UserCrud.Rooms.Dto;

namespace UserCrud.Rooms
{
  
    public class RoomAppService : ApplicationService, IRoomAppService
    {
        private readonly IRepository<Rooms, long> _roomRepository;


        public RoomAppService(IRepository<Rooms, long> roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<List<RoomDto>> GetAllRoomsAsync()
        {
            var rooms = await _roomRepository.GetAllListAsync();
            var data = ObjectMapper.Map<List<RoomDto>>(rooms);
            return data;
        }
        public async Task<RoomDto> GetRoomByIdAsync(long Id)
        {
            var room = await _roomRepository.GetAsync(Id);
            var data = ObjectMapper.Map<RoomDto>(room);
            return data;
        }
        public async Task<RoomDto> CreateRoomAsync(CreateRoomDto input)
        {
            var room = ObjectMapper.Map<Rooms>(input);
            var createdRoom = await _roomRepository.InsertAsync(room);
            var data = ObjectMapper.Map<RoomDto>(createdRoom);
            return data;
        }
        public async Task<RoomDto> UpdateRoomAsync(UpdateRoomDto input)
        {
            var room = await _roomRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, room);
            var updatedRoom = await _roomRepository.UpdateAsync(room);
            var data = ObjectMapper.Map<RoomDto>(updatedRoom);
            return data;
        } 

        public async Task DeleteRoomAsync(long Id)
        {
            await _roomRepository.DeleteAsync(Id);
        }


    }

}
