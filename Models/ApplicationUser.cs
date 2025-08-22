using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagement.Models
{
    public class ApplicationUser
    {
        [Required]
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public bool IsAdmin { get; set; } = false; // Optional if you want role-based auth
    }
}
