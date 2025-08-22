using static System.Collections.Specialized.BitVector32;

namespace SchoolManagement.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }

        public DateTime DOB { get; set; }
        public string RollNumber { get; set; }
        public int ClassroomId { get; set; }
        public string Section { get; set; }
    }
}
