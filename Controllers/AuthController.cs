using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        public enum UserRoles
        {
            Admin,
            Teacher
        }

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO entity)
        {
            ApplicationUser user = new ApplicationUser() { Username = entity.Username, PasswordHash = "default", IsAdmin = false};
            TeacherProfile teacher = new TeacherProfile { ApplicationUser=user,FullName=""};
            if (user == null || string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("Invalid user data.");
            }
            else
            {
                var existingUser = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.Username == user.Username);
                if (existingUser != null)
                {
                    return Conflict("User already exists.");
                }
                user.PasswordHash = _passwordHasher.HashPassword(user.Username, user.PasswordHash);

                teacher.FullName = entity.FullName;
                teacher.ApplicationUser = user;//needs to update with applicationUserId
            }

            // Add the new user to the database
            _context.ApplicationUsers.Add(user);
            if(!user.IsAdmin)
                _context.TeacherProfiles.Add(teacher);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully.");
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
                    var token = GenerateToken(user); // Placeholder for token generation logic
                    if(user.IsAdmin==false)
                    {
                        profile = await _context.TeacherProfiles.SingleOrDefaultAsync(p => p.ApplicationUser.Id == user.Id);
                    }
                    //string username = await _context.TeacherProfiles;
                    return Ok(new { Token = token, Username= profile.ApplicationUser.Username,ApplicationUserId=profile.ApplicationUser.Id,TeachersId=profile.Id,FullName=profile.FullName,EmployeeId=profile.EmployeeId, IsAdmin=profile.ApplicationUser.IsAdmin});
                }
                else
                    return BadRequest("Wrong password.");
            }
        }
        [NonAction]
        public string GenerateToken(ApplicationUser user)
        {
            var claims = new[]
            {
                new Claim("username", user.Username),
                new Claim("isAdmin", user.IsAdmin.ToString()),
                new Claim("id", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(   
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(Double.Parse(_config["JwtSettings:ExpiryHours"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
