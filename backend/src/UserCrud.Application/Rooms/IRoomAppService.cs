using Abp.Application;
using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms.Dto;

namespace UserCrud.Rooms
{
    public interface IRoomAppService : IApplicationService
    {

        Task<List<RoomDto>> GetAllRoomsAsync();
        Task<RoomDto> GetRoomByIdAsync(long Id);
        Task<RoomDto> CreateRoomAsync(CreateRoomDto input);
        Task<RoomDto> UpdateRoomAsync(UpdateRoomDto input);
        Task DeleteRoomAsync(long Id);

    }
}
