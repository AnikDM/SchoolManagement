namespace SchoolManagement.DTOs
{
    public class TeacherDto
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public int? EmployeeId { get; set; }
        public string? Username { get; set; }
    }

    public class UpdateTeacherDto
    {
        public string? FullName { get; set; }
        public int? EmployeeId { get; set; }
    }
}