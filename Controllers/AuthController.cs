using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SchoolManagement.IServices;
using SchoolManagement.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly IAuthService _auth;
        public enum UserRoles
        {
            Admin,
            Teacher
        }

        public AuthController(ApplicationDbContext context, IConfiguration config,IAuthService auth)
        {
            _context = context;
            _config = config;
            _auth = auth;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO entity)
        {
            return await _auth.Register(entity);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto entity)
        {
            if (entity == null || string.IsNullOrEmpty(entity.Email) || string.IsNullOrEmpty(entity.Password))
            {
                return BadRequest("Invalid login data.");
            }
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.Username == entity.Email);
            TeacherProfile profile = new TeacherProfile();
            if (user == null)
            {
                return NotFound("User not found.");
            }
            else
            {
                var result = _passwordHasher.VerifyHashedPassword(user.Username, user.PasswordHash, entity.Password);
                if (result == PasswordVerificationResult.Success)
                {
                    var token = _auth.GenerateTokenAsync(user); // Placeholder for token generation logic
                    if(user.IsAdmin==false)
                    {
                        profile = await _context.TeacherProfiles.SingleOrDefaultAsync(p => p.ApplicationUser.Id == user.Id);
                    }
                    if (profile.FullName != null)
                        return Ok(new { Token = token, Username = profile.ApplicationUser.Username, ApplicationUserId = profile.ApplicationUser.Id, TeachersId = profile.Id, FullName = profile.FullName, EmployeeId = profile.EmployeeId, IsAdmin = profile.ApplicationUser.IsAdmin });
                    else
                        return Ok(new
                        {
                            Token = token,
                            Username = user.Username,
                            ApplicationUserId = user.Id,
                            IsAdmin = user.IsAdmin,
                            TeachersId=0,
                            FullName="Admin"
                        });
                }
                else
                    return BadRequest("Wrong password.");
            }
        }
    }
}
