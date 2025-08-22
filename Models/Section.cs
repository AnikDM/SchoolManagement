namespace SchoolManagement.Models
{
    public class Section
    {
        public int Id { get; set; }
        public string Name { get; set; } // e.g. "A", "B"

        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public int? ClassTeacherId { get; set; }
        public TeacherProfile ClassTeacher { get; set; }

        public ICollection<Student> Students { get; set; }
    }
}
