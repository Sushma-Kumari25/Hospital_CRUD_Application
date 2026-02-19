using System;
using Abp.Application.Services;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.PatientAdmission.Dto;

namespace UserCrud.PatientAdmission
{
    public interface IPatientAdmissionAppService : IApplicationService
    {

        Task<List<PatientAdmissionDto>> GetAllAsync();
        Task<PatientAdmissionDto> CreateAsync(CreatePatientAdmissionDto input);
        Task<PatientAdmissionDto> UpdateAsync(UpdatePatientAdmissionDto input);
        Task DeleteAsync(long Id);
        Task<PatientAdmissionDto> GetAsync(long id);


    }
}
