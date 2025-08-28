using SchoolManagement.Models;

namespace SchoolManagement.IServices
{
    public interface IAuthService
    {
        Task<string> GenerateTokenAsync(ApplicationUser user);
        Task<string> Register(RegisterUserDTO user);
    }
}