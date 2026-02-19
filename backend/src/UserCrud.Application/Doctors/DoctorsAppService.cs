using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using UserCrud.Doctors.Dto;

namespace UserCrud.Doctors
{
    public class DoctorsAppService : ApplicationService, IDoctorsAppService
    {
        private readonly IRepository<Doctor, long> _doctorRepository;
        private readonly IWebHostEnvironment _env;

        public DoctorsAppService(
            IRepository<Doctor, long> doctorRepository,
            IWebHostEnvironment env)
        {
            _doctorRepository = doctorRepository;
            _env = env;
        }

        public async Task<List<DoctorsDto>> GetAllDoctorsAsync()
        {
            var doctors = await _doctorRepository.GetAllListAsync();
            return ObjectMapper.Map<List<DoctorsDto>>(doctors);
        }

        public async Task<DoctorsDto> GetDoctorByIdAsync(long id)
        {
            var doctor = await _doctorRepository.GetAsync(id);
            return ObjectMapper.Map<DoctorsDto>(doctor);
        }

        // 🔥 CREATE DOCTOR WITH PHOTOS
        public async Task<DoctorsDto> CreateDoctorAsync([FromForm] CreateDoctorsDto input)
        {
            try
            {
                var doctor = ObjectMapper.Map<Doctor>(input);

                var uploadPath = Path.Combine(_env.WebRootPath, "uploads/doctors");

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                // PHOTO 1
                if (input.Photo1 != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(input.Photo1.FileName);
                    var filePath = Path.Combine(uploadPath, fileName);

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await input.Photo1.CopyToAsync(stream);

                    doctor.Photo1Path = "/uploads/doctors/" + fileName;
                }

                // PHOTO 2
                if (input.Photo2 != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(input.Photo2.FileName);
                    var filePath = Path.Combine(uploadPath, fileName);

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await input.Photo2.CopyToAsync(stream);

                    doctor.Photo2Path = "/uploads/doctors/" + fileName;
                }

                var createdDoctor = await _doctorRepository.InsertAsync(doctor);
                return ObjectMapper.Map<DoctorsDto>(createdDoctor);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Error creating doctor", ex.Message);
            }
        }

        // 🔥 UPDATE DOCTOR WITH PHOTO REPLACEMENT
        public async Task<DoctorsDto> UpdateDoctorAsync([FromForm] UpdateDoctorsDto input)
        {
            var doctor = await _doctorRepository.GetAsync(input.Id);

            ObjectMapper.Map(input, doctor);

            var uploadPath = Path.Combine(_env.WebRootPath, "uploads/doctors");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            // ⭐ UPDATE PHOTO 1
            if (input.Photo1 != null)
            {
                DeleteOldFile(doctor.Photo1Path);

                var fileName = Guid.NewGuid() + Path.GetExtension(input.Photo1.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await input.Photo1.CopyToAsync(stream);

                doctor.Photo1Path = "/uploads/doctors/" + fileName;
            }

            // ⭐ UPDATE PHOTO 2
            if (input.Photo2 != null)
            {
                DeleteOldFile(doctor.Photo2Path);

                var fileName = Guid.NewGuid() + Path.GetExtension(input.Photo2.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await input.Photo2.CopyToAsync(stream);

                doctor.Photo2Path = "/uploads/doctors/" + fileName;
            }

            var updatedDoctor = await _doctorRepository.UpdateAsync(doctor);
            return ObjectMapper.Map<DoctorsDto>(updatedDoctor);
        }

        public async Task DeleteDoctorAsync(long id)
        {
            await _doctorRepository.DeleteAsync(id);
        }

        // 🧹 DELETE OLD IMAGE
        private void DeleteOldFile(string filePath)
        {
            if (string.IsNullOrEmpty(filePath)) return;

            var fullPath = Path.Combine(_env.WebRootPath, filePath.TrimStart('/'));

            if (File.Exists(fullPath))
                File.Delete(fullPath);
        }
    }
}
