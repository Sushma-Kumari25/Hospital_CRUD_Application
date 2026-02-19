using Abp.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Doctors.Dto;

namespace UserCrud.Doctors
{
    public interface IDoctorsAppService : IApplicationService
    {
        Task<List<DoctorsDto>> GetAllDoctorsAsync();
        Task<DoctorsDto> GetDoctorByIdAsync(long id);
        Task<DoctorsDto> CreateDoctorAsync(CreateDoctorsDto input);
        Task<DoctorsDto> UpdateDoctorAsync(UpdateDoctorsDto input);
        Task DeleteDoctorAsync(long id);
    }
}
