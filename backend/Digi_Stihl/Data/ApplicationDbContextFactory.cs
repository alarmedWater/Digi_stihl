using Digi_Stihl.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Digi_Stihl.Data;

/// <summary>
/// Factory for creating ApplicationDbContext instances at design time.
/// </summary>
public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    /// <summary>
    /// Creates a new instance of ApplicationDbContext.
    /// </summary>
    /// <param name="args">Arguments provided by the design-time tools.</param>
    /// <returns>A new instance of ApplicationDbContext.</returns>
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

        optionsBuilder.UseSqlServer("Server=localhost,1433;Database=Stihl;User Id=sa;Password=Stihl@1234;TrustServerCertificate=True;");

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
