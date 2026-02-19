using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Patients.Enums;


namespace UserCrud.Patients
{
    public class Patient : FullAuditedEntity<long>
    {
        
        public string PatientCode { get; set; }   // Unique hospital ID
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public PatientEnum Gender { get; set; }

        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public DateTime CreatedAt { get; set; }
        public string PhotoPath { get; set; }
    }

}
