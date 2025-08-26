using SchoolManagement.Models;

namespace SchoolManagement.DTOs
{
    public class ClassroomDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Sections { get; set; }
        public int Strength { get; set; }
        public int? ClassTeacherId { get; set; }
        public string? ClassTeacherName { get; set; }
    }

    public class CreateClassroomDto
    {
        public string ClassroomName { get; set; }
        public int Sections { get; set; }
        public int? TeacherId { get; set; }
    }

    public class UpdateClassroomDto
    {
        public string Name { get; set; }
        public int Sections { get; set; }
        public int Strength { get; set; }
        public int? ClassTeacherId { get; set; }
    }
}