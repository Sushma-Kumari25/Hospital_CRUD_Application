using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using UserCrud.Patients.Enums;

namespace UserCrud.Patients.Dto
{
    public class CreatePatientsDto
    {
        [Required]
        public string PatientCode { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public PatientEnum Gender { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Address { get; set; }

        public IFormFile Photo { get; set; }
    }
}
