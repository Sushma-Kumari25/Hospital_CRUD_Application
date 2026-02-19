using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Beds
{
    public class Bed : FullAuditedEntity<long>
    {


        public long RoomId { get; set; }
        public string BedNumber { get; set; }
        public bool IsOccupied { get; set; }

       
 


    }
}
