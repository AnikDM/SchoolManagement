using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SchoolManagement.DTOs;
using SchoolManagement.IServices;
using SchoolManagement.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolManagement.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> GenerateTokenAsync(ApplicationUser user)
        {
            var claims = new[]
            {
                new Claim("username", user.Username),
                new Claim("isAdmin", user.IsAdmin.ToString()),
                new Claim("id", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(Double.Parse(_configuration["JwtSettings:ExpiryHours"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public async Task<IActionResult> Register(RegisterUserDTO entity)
        {
            ApplicationUser user = new ApplicationUser() { Username = entity.Username, PasswordHash = "default", IsAdmin = false };
            TeacherProfile teacher = new TeacherProfile { ApplicationUser = user, FullName = "" };
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

                if (entity.FullName.Equals("admin"))
                    user.IsAdmin = true;
                else
                {
                    teacher.FullName = entity.FullName;
                    teacher.ApplicationUser = user;//needs to update with applicationUserId
                }
            }

            // Add the new user to the database
            _context.ApplicationUsers.Add(user);
            if (!user.IsAdmin)
                _context.TeacherProfiles.Add(teacher);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully.");
        }
    }
}