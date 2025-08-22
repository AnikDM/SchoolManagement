using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.DTOs;
using SchoolManagement.Models;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamResultsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ExamResultsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddExamResult([FromBody] CreateExamResultDto dto)
        {
            var examResult = _mapper.Map<ExamResult>(dto);
            _context.ExamResults.Add(examResult);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<ExamResultDto>(examResult);
            return CreatedAtAction(nameof(GetExamResult), new { id = examResult.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExamResult(int id)
        {
            var examResult = await _context.ExamResults       
                .Include(r => r.Subject)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (examResult == null) return NotFound();

            return Ok(_mapper.Map<ExamResultDto>(examResult));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExamResult(int id, [FromBody] UpdateExamResultDto dto)
        {
            var examResult = await _context.ExamResults.FindAsync(id);
            if (examResult == null) return NotFound();

            _mapper.Map(dto, examResult); // AutoMapper updates properties  
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
