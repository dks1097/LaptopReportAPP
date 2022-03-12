using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaptopReport.Models
{
    public class UserReport
    {
        public int UserID { get; set; }
        public string LaptopType { get; set; }

        public string Issue { get; set; }

        public string Notes { get; set; }

        public string SerialNumber { get; set; }

        public string DateOfReport { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }

        public string Picture  { get; set; }
    }
}