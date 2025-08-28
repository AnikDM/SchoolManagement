using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.DTOs;
using SchoolManagement.Models;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TeachersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateTeacher(TeacherDto entity)
        {
            if (entity != null)
            {
                //var result=_auth.Register(new RegisterUserDTO { FullName =entity.FullName??"",Username=entity.Username??""});
                //Console.WriteLine(result);
            }
            return Ok("Teacher Profile created");
        }

        // Fetch all teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherDto>>> GetTeachers()
        {
            var teachers = await _context.TeacherProfiles.Include(t => t.ApplicationUser).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<TeacherDto>>(teachers));
        }

        // Fetch teacher by id
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherDto>> GetTeacher(int id)
        {
            var teacher = await _context.TeacherProfiles.Include(t => t.ApplicationUser).FirstOrDefaultAsync(t => t.Id == id);
            if (teacher == null) return NotFound();
            return Ok(_mapper.Map<TeacherDto>(teacher));
        }

        // Update teacher
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(int id, [FromBody] UpdateTeacherDto updateDto)
        {
            var teacher = await _context.TeacherProfiles.FindAsync(id);
            if (teacher == null) return NotFound();
            _mapper.Map(updateDto, teacher);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Delete teacher
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.TeacherProfiles.FindAsync(id);
            if (teacher == null) return NotFound();
            _context.TeacherProfiles.Remove(teacher);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}