using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UserCrud.Patients.Dto;
using UserCrud.Patients.Enums;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace UserCrud.Patients
{
    public class PatientsAppService : ApplicationService
    {
        private readonly IRepository<Patient, long> _patientRepository;

        public PatientsAppService(IRepository<Patient, long> patientRepository)
        {
            _patientRepository = patientRepository;
        }

        // =================== GET ALL PATIENTS ===================
        public async Task<List<PatientsDto>> GetAllPatientsAsync()
        {
            var patients = await _patientRepository.GetAllListAsync();
            return patients.Select(MapToPatientsDto).ToList();
        }

        // =================== GET PATIENT BY ID ===================
        public async Task<PatientsDto> GetPatientByIdAsync(long id)
        {
            var patient = await _patientRepository.FirstOrDefaultAsync(id);
            if (patient == null)
                throw new UserFriendlyException("Not Found", $"Patient with ID '{id}' does not exist.");

            return MapToPatientsDto(patient);
        }

        // =================== CREATE PATIENT ===================
        public async Task<PatientsDto> CreatePatientAsync([FromForm] CreatePatientsDto input)
        {
            await EnsureNoDuplicateAsync(input.PatientCode, input.Email);

            var patient = new Patient
            {
                PatientCode = input.PatientCode,
                FirstName = input.FirstName,
                LastName = input.LastName,
                DateOfBirth = Convert.ToDateTime(input.DateOfBirth),
                Gender = input.Gender,
                PhoneNumber = input.PhoneNumber,
                Email = input.Email,
                Address = input.Address,
                CreationTime = DateTime.UtcNow
            };

            if (input.Photo != null)
            {
                patient.PhotoPath = await SavePhotoAsync(input.Photo);
            }

            var createdPatient = await _patientRepository.InsertAsync(patient);
            return MapToPatientsDto(createdPatient);
        }

        // =================== UPDATE PATIENT ===================
        public async Task<PatientsDto> UpdatePatientAsync([FromForm] UpdatePatientsDto input)
        {
            var patient = await _patientRepository.FirstOrDefaultAsync(input.Id);
            if (patient == null)
                throw new UserFriendlyException("Not Found", $"Patient with ID '{input.Id}' does not exist.");

            await EnsureNoDuplicateAsync(input.PatientCode, input.Email, input.Id);

            patient.PatientCode = input.PatientCode;
            patient.FirstName = input.FirstName;
            patient.LastName = input.LastName;
            patient.DateOfBirth = input.DateOfBirth;
            patient.Gender = input.Gender;
            patient.PhoneNumber = input.PhoneNumber;
            patient.Email = input.Email;
            patient.Address = input.Address;

            if (input.Photo != null)
            {
                patient.PhotoPath = await ReplacePhotoAsync(patient.PhotoPath, input.Photo);
            }

            var updatedPatient = await _patientRepository.UpdateAsync(patient);
            return MapToPatientsDto(updatedPatient);
        }

        // =================== DELETE PATIENT ===================
        public async Task DeletePatientAsync(long id)
        {
            var patient = await _patientRepository.FirstOrDefaultAsync(id);
            if (patient == null)
                throw new UserFriendlyException("Not Found", $"Patient with ID '{id}' does not exist.");

            if (!string.IsNullOrWhiteSpace(patient.PhotoPath))
            {
                DeleteFileIfExists(patient.PhotoPath);
            }

            await _patientRepository.DeleteAsync(id);
        }

        // =================== HELPER: MAP ENTITY TO DTO ===================
        private PatientsDto MapToPatientsDto(Patient patient)
        {
            return new PatientsDto
            {
                Id = patient.Id,
                PatientCode = patient.PatientCode,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                DateOfBirth = patient.DateOfBirth,
                Gender = patient.Gender,
                PhoneNumber = patient.PhoneNumber,
                Email = patient.Email,
                Address = patient.Address,
                CreatedAt = patient.CreationTime,
                PhotoPath = patient.PhotoPath
            };
        }

        // =================== HELPER: ENSURE NO DUPLICATES ===================
        private async Task EnsureNoDuplicateAsync(string patientCode, string email, long? excludeId = null)
        {
            if (await _patientRepository.FirstOrDefaultAsync(p => p.PatientCode == patientCode && p.Id != excludeId) != null)
            {
                throw new UserFriendlyException("Duplicate Patient Code", $"Patient code '{patientCode}' already exists.");
            }

            if (!string.IsNullOrWhiteSpace(email) &&
                await _patientRepository.FirstOrDefaultAsync(p => p.Email == email && p.Id != excludeId) != null)
            {
                throw new UserFriendlyException("Duplicate Email", $"Email '{email}' is already associated with another patient.");
            }
        }

        // =================== HELPER: SAVE PHOTO ===================
        private async Task<string> SavePhotoAsync(IFormFile photo)
        {
            ValidatePhoto(photo);

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "patients");
            if (!Directory.Exists(uploadFolder))
                Directory.CreateDirectory(uploadFolder);

            var fileName = Guid.NewGuid() + Path.GetExtension(photo.FileName).ToLower();
            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            return "/uploads/patients/" + fileName;
        }

        // =================== HELPER: REPLACE PHOTO ===================
        private async Task<string> ReplacePhotoAsync(string existingPath, IFormFile newPhoto)
        {
            if (!string.IsNullOrWhiteSpace(existingPath))
            {
                DeleteFileIfExists(existingPath);
            }

            return await SavePhotoAsync(newPhoto);
        }

        // =================== HELPER: DELETE FILE ===================
        private void DeleteFileIfExists(string relativePath)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", relativePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(filePath))
                File.Delete(filePath);
        }

        // =================== HELPER: VALIDATE PHOTO ===================
        private void ValidatePhoto(IFormFile photo)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var ext = Path.GetExtension(photo.FileName).ToLower();

            if (!allowedExtensions.Contains(ext))
                throw new UserFriendlyException("Invalid File", "Only JPG or PNG files are allowed.");

            if (photo.Length > 2 * 1024 * 1024) // 2 MB
                throw new UserFriendlyException("File Too Large", "Maximum allowed file size is 2 MB.");
        }
    }
}
