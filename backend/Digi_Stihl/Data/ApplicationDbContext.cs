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

        public DbSet<Employee> Employees               => Set<Employee>();
        public DbSet<Department> Departments          => Set<Department>();
        public DbSet<CapacityDeviation> CapacityDeviations => Set<CapacityDeviation>();
        public DbSet<ExitReason> ExitReasons          => Set<ExitReason>();
        public DbSet<FluctuationReport> FluctuationReports => Set<FluctuationReport>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ─── 1) Static seed for Departments ──────────────────────
            modelBuilder.Entity<Department>().HasData(
                new Department { Kostenstelle = "D001", Abteilungsname = "Produktion",  Bereichsnummer = "01" },
                new Department { Kostenstelle = "D002", Abteilungsname = "Vertrieb",    Bereichsnummer = "02" },
                new Department { Kostenstelle = "D003", Abteilungsname = "Personal",    Bereichsnummer = "03" },
                new Department { Kostenstelle = "D004", Abteilungsname = "IT",          Bereichsnummer = "04" },
                new Department { Kostenstelle = "D005", Abteilungsname = "Verwaltung",  Bereichsnummer = "05" }
            );

            // ─── 2) Static seed for ExitReasons ────────────────────
            modelBuilder.Entity<ExitReason>().HasData(
                new ExitReason { ExitReasonId = 1, Reason = ExitReasonType.AN_Kuendigung,  Description = "Eigenkündigung" },
                new ExitReason { ExitReasonId = 2, Reason = ExitReasonType.AG_Kuendigung,  Description = "Kündigung durch Arbeitgeber" },
                new ExitReason { ExitReasonId = 3, Reason = ExitReasonType.Altersteilzeit, Description = "Eintritt in Altersteilzeit" },
                new ExitReason { ExitReasonId = 4, Reason = ExitReasonType.Ruhestand,     Description = "Ruhestand" },
                new ExitReason { ExitReasonId = 5, Reason = ExitReasonType.Probezeitende,  Description = "Ende der Probezeit" }
            );

            // ─── 3) Explicit decimal precision for FluctuationReport ─
            modelBuilder.Entity<FluctuationReport>()
                .Property(fr => fr.Fluktuationsrate)
                .HasColumnType("decimal(5,2)");

            // ─── 4) Unique index on (EmployeeId, Year, Month) ─────────
            modelBuilder.Entity<CapacityDeviation>()
                .HasIndex(cd => new { cd.EmployeeId, cd.Year, cd.Month })
                .IsUnique();
        }
    }
}
