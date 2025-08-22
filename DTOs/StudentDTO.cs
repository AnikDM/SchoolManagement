namespace SchoolManagement.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string RollNumber { get; set; }
        public string SectionName { get; set; }
    }

    public class CreateStudentDto
    {
        public string FullName { get; set; }
        public string RollNumber { get; set; }
        public int SectionId { get; set; }
    }

    public class UpdateStudentDto
    {
        public string RollNumber { get; set; }
        public int SectionId { get; set; }
    }
}
