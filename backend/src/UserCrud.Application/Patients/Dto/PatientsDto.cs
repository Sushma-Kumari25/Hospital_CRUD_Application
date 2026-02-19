using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Patients.Enums;

namespace UserCrud.Patients.Dto
{
    public class PatientsDto
    {
        public long Id { get; set; }

        public string PatientCode { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public PatientEnum Gender { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public DateTime CreatedAt { get; set; }

        // ⭐ Photo path for showing image
        public string PhotoPath { get; set; }
        // ⭐ Add these
        public string DateOfBirthString => DateOfBirth.ToString("dd-MM-yyyy");
        public string CreatedAtString => CreatedAt.ToString("dd-MM-yyyy hh:mm tt");
    }
}
