using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.PatientAdmission.Dto;


namespace UserCrud.PatientAdmission
{
    public class PatientAdmissionAppService
        : ApplicationService, IPatientAdmissionAppService

    {
        private readonly IRepository<PatientAdmission, long> _patientAdmissionRepository;
        private readonly IRepository<Patients.Patient, long> _patientRepository;
        private readonly IRepository<Doctors.Doctor, long> _doctorRepository;
        private readonly IRepository<Beds.Bed, long> _bedRepository;
        private readonly IRepository<Rooms.Rooms, long> _roomRepository;



        public PatientAdmissionAppService(
            IRepository<PatientAdmission, long> patientAdmissionRepository,
            IRepository<Patients.Patient, long> patientRepository,
            IRepository<Doctors.Doctor, long> doctorRepository,
            IRepository<Beds.Bed, long> bedRepository,
            IRepository<Rooms.Rooms, long> roomRepository
            )
        {
            _patientAdmissionRepository = patientAdmissionRepository;
            _patientRepository = patientRepository;
            _doctorRepository = doctorRepository;
            _bedRepository = bedRepository;
            _roomRepository = roomRepository;
        }

        public async Task<List<NameValueDto>> GetPatientLookupAsync()
        {
            var patients = await _patientRepository.GetAllListAsync();
            return patients.Select(x =>
                new NameValueDto(
                    x.FirstName,
                    x.Id.ToString()
                )
            ).ToList();
        }

        public async Task<List<NameValueDto>> GetDoctorLookupAsync()
        {
            var doctors = await _doctorRepository.GetAllListAsync();
            return doctors.Select(x =>
                new NameValueDto(
                    x.FullName,
                    x.Id.ToString()
                )
            ).ToList();


        }

        public async Task<List<NameValueDto>> GetRoomLookupAsync()
        {
            var rooms = await _roomRepository.GetAllListAsync();
            return rooms.Select(x =>
                new NameValueDto(
                    x.RoomNumber,
                    x.Id.ToString()
                )
            ).ToList();
        }

        public async Task<List<NameValueDto>> GetBedLookupAsync()
        {

            var beds = await _bedRepository.GetAllListAsync();

            return beds.Select(x =>
                new NameValueDto(
                    x.BedNumber,
                    x.Id.ToString()
                )
            ).ToList();
        }

        public async Task<List<PatientAdmissionDto>> GetAllAsync()
        {
            var admissions = await _patientAdmissionRepository
                .GetAll()
                .Include(x => x.Patient)
                .Include(x => x.Doctor)
                .Include(x => x.Bed)


                .ToListAsync();

            return admissions.Select(x => new PatientAdmissionDto
            {
                Id = x.Id,
                PatientId = x.PatientId,
                FirstName = x.Patient?.FirstName,
                DoctorId = x.DoctorId,
                FullName = x.Doctor?.FullName,
                BedId = x.BedId,
                BedNumber = x.Bed?.BedNumber,

                AdmissionDate = x.AdmissionDate,
                DischargeDate = x.DischargeDate,
                Diagnosis = x.Diagnosis,
                Status = x.Status
            }).ToList();
        }

        public async Task<PatientAdmissionDto> CreateAsync(CreatePatientAdmissionDto input)
        {
            try
            {
                 

                var admission = ObjectMapper.Map<PatientAdmission>(input);

                var createdAdmission = await _patientAdmissionRepository.InsertAsync(admission);

                return ObjectMapper.Map<PatientAdmissionDto>(createdAdmission);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("An error occurred while creating the patient admission.", ex);
            }
        }



        public async Task<PatientAdmissionDto> UpdateAsync(UpdatePatientAdmissionDto input)
        {
            try
            {
                var admission = await _patientAdmissionRepository.GetAsync(input.Id);

                if (admission == null)
                {
                    throw new UserFriendlyException("Patient admission not found");
                }

                ObjectMapper.Map(input, admission);

                return ObjectMapper.Map<PatientAdmissionDto>(admission);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("An error occurred while updating the patient admission.", ex);
            }
        }


        public async Task DeleteAsync(long Id)
        {
            try
            {
                await _patientAdmissionRepository.DeleteAsync(Id);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("An error occurred while deleting the patient admission.", ex);
            }
        }


        public async Task<PatientAdmissionDto> GetAsync(long id)
        {
            var admission = await _patientAdmissionRepository
                .GetAll()
                .Include(x => x.Patient)
                .Include(x => x.Doctor)
                .Include(x => x.Bed)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (admission == null)
            {
                throw new UserFriendlyException("Patient admission not found");
            }

            return new PatientAdmissionDto
            {
                Id = admission.Id,
                PatientId = admission.PatientId,
                FirstName = admission.Patient?.FirstName,
                DoctorId = admission.DoctorId,
                FullName = admission.Doctor?.FullName,
                BedId = admission.BedId,
                BedNumber = admission.Bed?.BedNumber,
                AdmissionDate = admission.AdmissionDate,
                DischargeDate = admission.DischargeDate,
                Diagnosis = admission.Diagnosis,
                Status = admission.Status
            };
        }

    }
}

