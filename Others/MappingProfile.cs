using AutoMapper;
using SchoolManagement.DTOs;
using SchoolManagement.Models;
namespace SchoolManagement.Others
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Student
            CreateMap<Student, StudentDto>()
                .ForMember(dest => dest.SectionName, opt => opt.MapFrom(src => src.Section));

            CreateMap<CreateStudentDto, Student>();
            CreateMap<UpdateStudentDto, Student>();

            // ExamResult
            CreateMap<ExamResult, ExamResultDto>()
                .ForMember(dest => dest.SubjectName, opt => opt.MapFrom(src => src.Subject));

            CreateMap<CreateExamResultDto, ExamResult>();
            CreateMap<UpdateExamResultDto, ExamResult>();
        }
    }

}
