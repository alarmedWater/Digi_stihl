using Digi_Stihl.Data;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Repositories;
using Digi_Stihl.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Digi_Stihl.Services.Tests
{
    public class EmployeeServiceTests
    {
        private ApplicationDbContext CreateInMemoryDb()
        {
            var opts = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var db = new ApplicationDbContext(opts);
            db.Database.EnsureCreated();
            return db;
        }

        [Fact]
        public async Task CreateEmployeeAsync_Adds_And_Returns_Entity()
        {
            var db = CreateInMemoryDb();
            var repo = new EmployeeRepository(db);
            var service = new EmployeeService(repo);

            var dto = new EmployeeDto 
            { 
                Name="Test", Vorname="User", Eintritt=DateTime.Today,
                Funktion="Dev", Kostenstelle="123", FTE=1m,
                Bereich="Direkt", Mengenabhaengig="Mengenabhängig",
                Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung"
            };

            var created = await service.CreateEmployeeAsync(dto);

            Assert.NotNull(created);
            Assert.Equal("Test", created.Name);

            // DB sollte den Eintrag enthalten:
            var fromDb = await db.Employees.FindAsync(created.EmployeeId);
            Assert.NotNull(fromDb);
            Assert.Equal("User", fromDb!.Vorname);
        }

        [Fact]
        public async Task UpdateEmployeeAsync_Updates_Existing()
        {
            var db = CreateInMemoryDb();
            var repo = new EmployeeRepository(db);
            var service = new EmployeeService(repo);

            // zuerst anlegen
            var baseDto = new EmployeeDto { Name="A", Vorname="B", Eintritt=DateTime.Today,
                Funktion="X", Kostenstelle="123", FTE=1m,
                Bereich="Direkt", Mengenabhaengig="Mengenabhängig",
                Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" };
            var created = await service.CreateEmployeeAsync(baseDto);

            // update
            var updateDto = baseDto;
            updateDto.Vorname = "C";
            var updated = await service.UpdateEmployeeAsync(created.EmployeeId, updateDto);

            Assert.NotNull(updated);
            Assert.Equal("C", updated!.Vorname);
        }

        [Fact]
        public async Task DeleteEmployeeAsync_Removes_Entity()
        {
            var db = CreateInMemoryDb();
            var repo = new EmployeeRepository(db);
            var service = new EmployeeService(repo);

            var dto = new EmployeeDto { Name="X", Vorname="Y", Eintritt=DateTime.Today,
                Funktion="X", Kostenstelle="123", FTE=1m,
                Bereich="Direkt", Mengenabhaengig="Mengenabhängig",
                Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" };
            var created = await service.CreateEmployeeAsync(dto);

            var result = await service.DeleteEmployeeAsync(created.EmployeeId);
            Assert.True(result);

            var fromDb = await db.Employees.FindAsync(created.EmployeeId);
            Assert.Null(fromDb);
        }

        [Fact]
        public async Task GetEmployeesAsync_Applies_Filter()
        {
            var db = CreateInMemoryDb();
            var repo = new EmployeeRepository(db);
            var service = new EmployeeService(repo);

            await service.CreateEmployeeAsync(new EmployeeDto { Name="Alpha", Vorname="A", Eintritt=DateTime.Today,
                Funktion="F", Kostenstelle="123", FTE=1m,
                Bereich="Direkt", Mengenabhaengig="Mengenabhängig",
                Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" });
            await service.CreateEmployeeAsync(new EmployeeDto { Name="Beta", Vorname="B", Eintritt=DateTime.Today,
                Funktion="F", Kostenstelle="123", FTE=1m,
                Bereich="Direkt", Mengenabhaengig="Mengenabhängig",
                Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" });

            var filters = new EmployeeFilterDto { Name = "Alpha" };
            var list = await service.GetEmployeesAsync(filters);

            Assert.Single(list);
            Assert.Equal("Alpha", list[0].Name);
        }
    }
}
