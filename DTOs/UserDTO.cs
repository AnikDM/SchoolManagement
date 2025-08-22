namespace SchoolManagement.Models
{
    public class RegisterUserDTO
    {
        public required string Username { get; set; }
        public required string FullName { get; set; }
    }
    public class LoginUserDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
