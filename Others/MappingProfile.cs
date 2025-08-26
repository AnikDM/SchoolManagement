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

            // Classroom
            CreateMap<Classroom, ClassroomDto>()
                .ForMember(dest => dest.ClassTeacherName, 
                    opt => opt.MapFrom(src => src.ClassTeacher != null ? src.ClassTeacher.FullName : null));
            CreateMap<CreateClassroomDto, Classroom>().ForMember(dest=>dest.Name,opt=>opt.MapFrom(src=>src.ClassroomName));
            CreateMap<UpdateClassroomDto, Classroom>();

            // Teacher
            CreateMap<TeacherProfile, TeacherDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.ApplicationUser != null ? src.ApplicationUser.Username : null));
            CreateMap<UpdateTeacherDto, TeacherProfile>();
        }
    }

}
