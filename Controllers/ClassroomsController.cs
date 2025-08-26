using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.DTOs;
using SchoolManagement.Models;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ClassroomsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ClassroomDto>>> GetClassrooms()
        {
            var classrooms = await _context.Classrooms
                .Include(c => c.ClassTeacher)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ClassroomDto>>(classrooms));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClassroomDto>> GetClassroom(int id)
        {
            var classroom = await _context.Classrooms
                .Include(c => c.ClassTeacher)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (classroom == null)
            {
                return NotFound();
            }

            return _mapper.Map<ClassroomDto>(classroom);
        }

        [HttpPost("create")]
        public async Task<ActionResult<ClassroomDto>> CreateClassroom(CreateClassroomDto createDto)
        {
            var classroom = _mapper.Map<Classroom>(createDto);

            if (createDto.TeacherId.HasValue)
            {
                var teacher = await _context.TeacherProfiles.FindAsync(createDto.TeacherId);
                if (teacher == null)
                {
                    return BadRequest("Invalid ClassTeacherId");
                }
                classroom.ClassTeacher = teacher;
            }

            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();

            var result = await _context.Classrooms
                .Include(c => c.ClassTeacher)
                .FirstAsync(c => c.Id == classroom.Id);

            return CreatedAtAction(
                nameof(GetClassroom),
                new { id = classroom.Id },
                _mapper.Map<ClassroomDto>(result)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClassroom(int id, UpdateClassroomDto updateDto)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, classroom);

            if (updateDto.ClassTeacherId.HasValue)
            {
                var teacher = await _context.TeacherProfiles.FindAsync(updateDto.ClassTeacherId);
                if (teacher == null)
                {
                    return BadRequest("Invalid ClassTeacherId");
                }
                classroom.ClassTeacher = teacher;
            }
            else
            {
                classroom.ClassTeacher = null;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassroomExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassroom(int id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }

            _context.Classrooms.Remove(classroom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassroomExists(int id)
        {
            return _context.Classrooms.Any(e => e.Id == id);
        }
    }
}