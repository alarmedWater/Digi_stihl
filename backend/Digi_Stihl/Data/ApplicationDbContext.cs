using Digi_Stihl.Models;
using Microsoft.EntityFrameworkCore;

namespace Digi_Stihl.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees                    => Set<Employee>();
        public DbSet<Department> Departments               => Set<Department>();
        public DbSet<CapacityDeviation> CapacityDeviations => Set<CapacityDeviation>();
        public DbSet<FluctuationReport> FluctuationReports => Set<FluctuationReport>();
        public DbSet<ExitReason> ExitReasons              => Set<ExitReason>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Departments (now including D007 “Trainees”)
            modelBuilder.Entity<Department>().HasData(
                new Department { Kostenstelle = "D001", Abteilungsname = "Produktion",  Bereichsnummer = "01" },
                new Department { Kostenstelle = "D002", Abteilungsname = "Vertrieb",    Bereichsnummer = "02" },
                new Department { Kostenstelle = "D003", Abteilungsname = "Personal",    Bereichsnummer = "03" },
                new Department { Kostenstelle = "D004", Abteilungsname = "IT",          Bereichsnummer = "04" },
                new Department { Kostenstelle = "D005", Abteilungsname = "Verwaltung",  Bereichsnummer = "05" },
                new Department { Kostenstelle = "D007", Abteilungsname = "Auszubildende", Bereichsnummer = "07" }
            );

            // Seed ExitReasons
            modelBuilder.Entity<ExitReason>().HasData(
                new ExitReason { ExitReasonId = 1, Reason = ExitReasonType.AN_Kuendigung,  Description = "Resignation by employee" },
                new ExitReason { ExitReasonId = 2, Reason = ExitReasonType.AG_Kuendigung,  Description = "Termination by employer" },
                new ExitReason { ExitReasonId = 3, Reason = ExitReasonType.Altersteilzeit, Description = "Entry into partial retirement" },
                new ExitReason { ExitReasonId = 4, Reason = ExitReasonType.Ruhestand,     Description = "Retirement" },
                new ExitReason { ExitReasonId = 5, Reason = ExitReasonType.Probezeitende,  Description = "End of probationary period" }
            );




            // Decimal-Precision for FluctuationReport
            modelBuilder.Entity<FluctuationReport>()
                .Property(fr => fr.Fluktuationsrate)
                .HasColumnType("decimal(5,2)");

            // Unique Index on (EmployeeId, StartDate, EndDate)
            modelBuilder.Entity<CapacityDeviation>()
                .HasIndex(cd => new { cd.EmployeeId, cd.StartDate, cd.EndDate })
                .IsUnique();
        }
    }
}
