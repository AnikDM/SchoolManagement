namespace SchoolManagement.Models
{
    public class TeacherProfile
    {
        public int Id { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
        public string? FullName { get; set; }
        public int? EmployeeId { get; set; }
    }
}
