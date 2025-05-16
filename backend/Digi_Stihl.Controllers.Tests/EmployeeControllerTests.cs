using Digi_Stihl.Controllers;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Digi_Stihl.Controllers.Tests
{
    public class EmployeeControllerTests
    {
        private readonly Mock<IEmployeeService> _mockService;
        private readonly EmployeesController _controller;

        public EmployeeControllerTests()
        {
            _mockService = new Mock<IEmployeeService>();
            _controller = new EmployeesController(_mockService.Object);
        }

        [Fact]
        public async Task Get_Returns_Ok_With_Employee()
        {
            var emp = new Employee { EmployeeId = 1, Name="X", Vorname="Y", Eintritt=DateTime.Today,
                Funktion="F", Kostenstelle="123", FTE=1m, Bereich="D", Mengenabhaengig="M", Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" };
            _mockService.Setup(s => s.GetEmployeeByIdAsync(1)).ReturnsAsync(emp);

            var result = await _controller.Get(1);
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(emp, ok.Value);
        }

        [Fact]
        public async Task Get_Returns_NotFound_If_Null()
        {
            _mockService.Setup(s => s.GetEmployeeByIdAsync(2)).ReturnsAsync((Employee?)null);

            var result = await _controller.Get(2);
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task Create_Returns_CreatedAtAction()
        {
            var dto = new EmployeeDto { Name="X", Vorname="Y", Eintritt=DateTime.Today,
                Funktion="F", Kostenstelle="123", FTE=1m, Bereich="D", Mengenabhaengig="M", Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" };
            var created = new Employee { EmployeeId = 3, Name="X", Vorname="Y", Eintritt=DateTime.Today,
                Funktion="F", Kostenstelle="123", FTE=1m, Bereich="D", Mengenabhaengig="M", Arbeitsverhaeltnis="Unbefristet", Austrittsart="AN Kündigung" };

            _mockService.Setup(s => s.CreateEmployeeAsync(dto)).ReturnsAsync(created);

            var result = await _controller.Create(dto);
            var createdAt = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(nameof(_controller.Get), createdAt.ActionName);
            Assert.Equal(created, createdAt.Value);
        }

        [Fact]
        public async Task Update_Returns_Ok_When_Found()
        {
            var dto = new EmployeeDto { /* ... */ };
            var updated = new Employee { EmployeeId = 4, Name="New", /* ... */ };

            _mockService.Setup(s => s.UpdateEmployeeAsync(4, dto)).ReturnsAsync(updated);

            var result = await _controller.Update(4, dto);
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(updated, ok.Value);
        }

        [Fact]
        public async Task Delete_Returns_NoContent_When_Success()
        {
            _mockService.Setup(s => s.DeleteEmployeeAsync(5)).ReturnsAsync(true);

            var result = await _controller.Delete(5);
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_Returns_NotFound_When_Failure()
        {
            _mockService.Setup(s => s.DeleteEmployeeAsync(6)).ReturnsAsync(false);

            var result = await _controller.Delete(6);
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
