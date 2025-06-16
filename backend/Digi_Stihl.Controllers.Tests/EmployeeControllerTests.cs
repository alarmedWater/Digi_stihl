// Tests/Controllers/EmployeesControllerTests.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Digi_Stihl.Controllers;
using Digi_Stihl.DTOs;
using Digi_Stihl.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Digi_Stihl.Tests.Controllers
{
    public class EmployeesControllerTests
    {
        private readonly Mock<IEmployeeService> _serviceMock;
        private readonly EmployeesController _controller;

        public EmployeesControllerTests()
        {
            _serviceMock = new Mock<IEmployeeService>();
            _controller  = new EmployeesController(_serviceMock.Object);
        }

        [Fact]
        public async Task Get_ReturnsOk_WithEmployeeDto_WhenFound()
        {
            // Arrange
            var dto = new EmployeeDto { EmployeeId = 1, Name = "Muster", Vorname = "Max" };
            _serviceMock
                .Setup(s => s.GetEmployeeByIdAsync(1))
                .ReturnsAsync(dto);

            // Act
            var result = await _controller.Get(1);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(dto, ok.Value);
        }

        [Fact]
        public async Task Get_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            _serviceMock
                .Setup(s => s.GetEmployeeByIdAsync(42))
                .ReturnsAsync((EmployeeDto?)null);

            // Act
            var result = await _controller.Get(42);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetAll_ReturnsOk_WithListOfDto()
        {
            // Arrange
            var list = new List<EmployeeDto> {
                new EmployeeDto { EmployeeId = 1, Name = "A", Vorname = "B" },
                new EmployeeDto { EmployeeId = 2, Name = "C", Vorname = "D" }
            };
            _serviceMock
                .Setup(s => s.GetEmployeesAsync(It.IsAny<EmployeeFilterDto>()))
                .ReturnsAsync(list);

            // Act
            var actionResult = await _controller.Get(new EmployeeFilterDto());

            // Assert
            var ok = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.Equal(list, ok.Value);
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction_WithDto()
        {
            // Arrange
            var create = new EmployeeDto { Name = "Neu", Vorname = "User" };
            var created = new EmployeeDto { EmployeeId = 5, Name = "Neu", Vorname = "User" };
            _serviceMock
                .Setup(s => s.CreateEmployeeAsync(create))
                .ReturnsAsync(created);

            // Act
            var result = await _controller.Create(create);

            // Assert
            var createdAt = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(created, createdAt.Value);
            Assert.Equal(nameof(EmployeesController.Get), createdAt.ActionName);
        }

        [Fact]
        public async Task Update_ReturnsOk_WhenFound()
        {
            // Arrange
            var id = 3;
            var dto = new EmployeeDto { EmployeeId = id, Name = "Upd", Vorname = "One" };
            _serviceMock
                .Setup(s => s.UpdateEmployeeAsync(id, dto))
                .ReturnsAsync(dto);

            // Act
            var result = await _controller.Update(id, dto);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(dto, ok.Value);
        }

        [Fact]
        public async Task Update_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            _serviceMock
                .Setup(s => s.UpdateEmployeeAsync(99, It.IsAny<EmployeeDto>()))
                .ReturnsAsync((EmployeeDto?)null);

            // Act
            var result = await _controller.Update(99, new EmployeeDto());

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent_WhenDeleted()
        {
            // Arrange
            _serviceMock
                .Setup(s => s.DeleteEmployeeAsync(2))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.Delete(2);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNotFound_WhenMissing()
        {
            // Arrange
            _serviceMock
                .Setup(s => s.DeleteEmployeeAsync(5))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.Delete(5);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
