using static System.Collections.Specialized.BitVector32;

namespace SchoolManagement.Models
{
    public class Classroom
    {
        public int Id { get; set; }
        public string Name { get; set; } // e.g. "Grade 5"
        public int Sections { get; set; }
        public int Strength { get; set; }
    }
}
