using Abp.Application.Services;

using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.Beds.Dto;

namespace UserCrud.Beds
{
    public class BedAppService : ApplicationService, IBedAppService
    {
        private readonly IRepository<Bed, long> _bedRepository;

        public BedAppService(IRepository<Bed, long> bedRepository)
        {
            _bedRepository = bedRepository;
        }

        public async Task<List<BedDto>> GetAllAsync()
        {
            var beds = await _bedRepository.GetAllListAsync();
            return ObjectMapper.Map<List<BedDto>>(beds);
        }

        public async Task<BedDto> GetByIdAsync(long id)
        {
            var bed = await _bedRepository.GetAsync(id);
            return ObjectMapper.Map<BedDto>(bed);
        }

        public async Task<BedDto> CreateAsync(CreateBedDto input)
        {
            var bed = ObjectMapper.Map<Bed>(input);
            var createdBed = await _bedRepository.InsertAsync(bed);
            return ObjectMapper.Map<BedDto>(createdBed);
        }

        public async Task<BedDto> UpdateAsync(UpdateBedDto input)
        {
            var bed = await _bedRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, bed);
            var updatedBed = await _bedRepository.UpdateAsync(bed);
            return ObjectMapper.Map<BedDto>(updatedBed);
        }

        public async Task DeleteAsync(long id)
        {
            await _bedRepository.DeleteAsync(id);
        }

        public async Task<List<NameValueDto>> GetBedLookupAsync()
        {
            try
            {
                var beds = await _bedRepository.GetAllListAsync();

                return beds.Select(x =>
                    new NameValueDto(
                        x.BedNumber,
                        x.Id.ToString()
                    )
                ).ToList();
            }
            catch
            {
                throw new UserFriendlyException("Failed to load bed dropdown");
            }
        }
    }
}
