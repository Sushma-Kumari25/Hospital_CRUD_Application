using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds;
using UserCrud.Doctors;
using UserCrud.PatientAdmission.Enum;
using UserCrud.Patients;
using static UserCrud.PatientAdmission.Enum.StatusEnums;

namespace UserCrud.PatientAdmission
{
    public class PatientAdmission : FullAuditedEntity<long>
    {

        public long PatientId { get; set; }
        public long DoctorId { get; set; }

       
        public long BedId { get; set; }

        public DateTime AdmissionDate { get; set; }

        public DateTime? DischargeDate { get; set; }
        public string Diagnosis { get; set; }
        public AdmissionStatus Status { get; set; } 

        
        public Patient Patient { get; set; } 
        public Doctor Doctor { get; set; } 
        public Bed Bed { get; set; } 

       
    }
}
