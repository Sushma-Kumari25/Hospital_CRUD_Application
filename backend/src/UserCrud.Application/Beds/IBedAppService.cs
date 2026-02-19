using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds.Dto;

namespace UserCrud.Beds
{
    public interface IBedAppService : IApplicationService
    {
        Task<List<BedDto>> GetAllAsync();
        Task<BedDto> CreateAsync(CreateBedDto input);
        Task<BedDto> UpdateAsync(UpdateBedDto input);
        Task<BedDto> GetByIdAsync(long id);
        Task DeleteAsync(long Id);
    }
}
