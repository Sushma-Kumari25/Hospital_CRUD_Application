using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms.Enum;
using static UserCrud.PatientAdmission.Enum.StatusEnums;

namespace UserCrud.PatientAdmission.Dto
{
    public class PatientAdmissionDto
    {
        public long Id { get; set; }
        public long PatientId { get; set; }
        public string FirstName{ get; set; }

        public long DoctorId { get; set; }
        public string FullName {get; set; }
        public long BedId { get; set; }
        public string BedNumber { get; set; }
        public BedEnum BedType { get; set; }

        public DateTime AdmissionDate { get; set; }
        public DateTime? DischargeDate { get; set; }
        public string Diagnosis { get; set; }
        public AdmissionStatus Status { get; set; }


    }
}
