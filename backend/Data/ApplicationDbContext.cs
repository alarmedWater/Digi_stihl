


using Microsoft.EntityFrameworkCore;
using Digi_Stihl.Models;

namespace Digi_Stihl.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) {}

    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<CapacityDeviation> CapacityDeviations => Set<CapacityDeviation>();
    public DbSet<ExitReason> ExitReasons => Set<ExitReason>();
    public DbSet<FluctuationReport> FluctuationReports => Set<FluctuationReport>();
}
