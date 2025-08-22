namespace SchoolManagement.DTOs
{
    public class ExamResultDto
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string SubjectName { get; set; }
        public string ExamName { get; set; }
        public int MarksObtained { get; set; }
        public int TotalMarks { get; set; }
        public DateTime ExamDate { get; set; }
    }

    public class CreateExamResultDto
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public string ExamName { get; set; }
        public int MarksObtained { get; set; }
        public int TotalMarks { get; set; }
        public DateTime ExamDate { get; set; }
    }

    public class UpdateExamResultDto
    {
        public string ExamName { get; set; }
        public int MarksObtained { get; set; }
        public int TotalMarks { get; set; }
        public DateTime ExamDate { get; set; }
    }

}
