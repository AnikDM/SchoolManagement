using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.Models
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) // this constructor takes the dbContextOptions parameter containing details like connection strings and other and passes it to the base DbContext class
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; } = null!;
        public DbSet<TeacherProfile> TeacherProfiles { get; set; } = null!;
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    // Configure the primary key for TeacherProfile
        //    modelBuilder.Entity<TeacherProfile>()
        //        .HasKey(tp => tp.Id);
        //    // Configure the relationship between ApplicationUser and TeacherProfile
        //    modelBuilder.Entity<TeacherProfile>()
        //        .HasOne(tp => tp.User)
        //        .WithOne()
        //        .HasForeignKey<TeacherProfile>(tp => tp.ApplicationUserId);
        //}
        public DbSet<Student> Students { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<ExamResult> ExamResults { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Example: enforce unique RollNumber
            builder.Entity<Student>()
                   .HasIndex(s => s.RollNumber)
                   .IsUnique();
        }
    }
}
