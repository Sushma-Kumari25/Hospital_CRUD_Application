using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using UserCrud.Patients.Dto;

namespace UserCrud.Patients
{
    public interface IPatientsAppService : IApplicationService
    {
        Task<List<PatientsDto>> GetAllPatientsAsync();
        Task<PatientsDto> GetPatientByIdAsync(long id);
        Task<PatientsDto> CreatePatientAsync(CreatePatientsDto input);
        Task<PatientsDto> UpdatePatientAsync(UpdatePatientsDto input);
        Task DeletePatientAsync(long id);
    }
}

