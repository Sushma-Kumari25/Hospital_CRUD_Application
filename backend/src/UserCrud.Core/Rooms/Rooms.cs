using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms.Enum;

namespace UserCrud.Rooms
{
    public class Rooms : FullAuditedEntity<long>
    {
       

        public string RoomNumber { get; set; }
        public BedEnum BedType { get; set; }

        public int TotalBeds { get; set; }
        public bool IsActive { get; set; }
    }

}
