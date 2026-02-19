using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Patients.Enums;

namespace UserCrud.Patients.Dto
{
    public class UpdatePatientsDto
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public string PatientCode { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public PatientEnum Gender { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Address { get; set; }

        public IFormFile Photo { get; set; } // optional
    }
}