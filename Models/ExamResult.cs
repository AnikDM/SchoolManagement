namespace SchoolManagement.Models
{
    public class ExamResult
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public int SubjectId { get; set; }
        public string Subject { get; set; }

        public string ExamName { get; set; } // e.g. "Mid Term"
        public int MarksObtained { get; set; }
        public int TotalMarks { get; set; }
        public DateTime ExamDate { get; set; }
    }
}
