using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Doctors.Dto
{
    public class UpdateDoctorsDto
    {

           public long Id { get; set; }
        public string DoctorCode { get; set; }
        public string FullName { get; set; }
         public string Qualification { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsAvailable { get; set; }
        public IFormFile Photo1 { get; set; }
        public IFormFile Photo2 { get; set; }
    }
}
