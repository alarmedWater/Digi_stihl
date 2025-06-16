// Tests/Services/EmployeeServiceTests.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.MappingProfiles;
using Digi_Stihl.Models;
using Digi_Stihl.Repositories;
using Digi_Stihl.Services;
using Moq;
using Xunit;

namespace Digi_Stihl.Tests.Services
{
    public class EmployeeServiceTests
    {
        private readonly Mock<IEmployeeRepository> _repoMock;
        private readonly IMapper _mapper;
        private readonly EmployeeService _service;

        public EmployeeServiceTests()
        {
            _repoMock = new Mock<IEmployeeRepository>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
            _mapper = config.CreateMapper();
            _service = new EmployeeService(_repoMock.Object, _mapper);
        }

        [Fact]
        public async Task CreateEmployeeAsync_AssignsGuidAndReturnsDto()
        {
            // Arrange
            var dto = new EmployeeDto { Name = "Muster", Vorname = "Max" };
            Employee captured = null!;
            _repoMock.Setup(r => r.AddAsync(It.IsAny<Employee>()))
                     .Callback<Employee>(e => captured = e)
                     .Returns(Task.CompletedTask);

            // Act
            var result = await _service.CreateEmployeeAsync(dto);

            // Assert
            _repoMock.Verify(r => r.AddAsync(It.IsAny<Employee>()), Times.Once);
            Assert.NotEqual(Guid.Empty, captured.EmployeeGuid);
            Assert.Equal(captured.EmployeeId, result.EmployeeId);
            Assert.Equal(captured.Name, result.Name);
            Assert.Equal(captured.Vorname, result.Vorname);
        }

        [Fact]
        public async Task UpdateEmployeeAsync_ReturnsNull_WhenNotFound()
        {
            // Arrange
            _repoMock.Setup(r => r.GetByIdAsync(42)).ReturnsAsync((Employee?)null);

            // Act
            var result = await _service.UpdateEmployeeAsync(42, new EmployeeDto());

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateEmployeeAsync_UpdatesAndReturnsDto()
        {
            // Arrange
            var existing = new Employee { EmployeeId = 1, Name = "Old", Vorname = "Name" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
            _repoMock.Setup(r => r.UpdateAsync(existing)).Returns(Task.CompletedTask);
            var dto = new EmployeeDto { EmployeeId = 1, Name = "New", Vorname = "Name" };

            // Act
            var result = await _service.UpdateEmployeeAsync(1, dto);

            // Assert
            _repoMock.Verify(r => r.UpdateAsync(existing), Times.Once);
            Assert.NotNull(result);
            Assert.Equal("New", existing.Name);
            Assert.Equal("New", result!.Name);
        }

        [Fact]
        public async Task DeleteEmployeeAsync_ReturnsFalse_WhenNotFound()
        {
            // Arrange
            _repoMock.Setup(r => r.GetByIdAsync(99)).ReturnsAsync((Employee?)null);

            // Act
            var result = await _service.DeleteEmployeeAsync(99);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteEmployeeAsync_ReturnsTrue_WhenDeleted()
        {
            // Arrange
            _repoMock.Setup(r => r.GetByIdAsync(2)).ReturnsAsync(new Employee { EmployeeId = 2 });
            _repoMock.Setup(r => r.DeleteByIdAsync(2)).Returns(Task.CompletedTask);

            // Act
            var result = await _service.DeleteEmployeeAsync(2);

            // Assert
            Assert.True(result);
            _repoMock.Verify(r => r.DeleteByIdAsync(2), Times.Once);
        }

        [Fact]
        public async Task GetEmployeeByIdAsync_ReturnsDto_WhenFound()
        {
            // Arrange
            var emp = new Employee { EmployeeId = 5, Name = "Test", Vorname = "User" };
            _repoMock.Setup(r => r.GetByIdAsync(5)).ReturnsAsync(emp);

            // Act
            var result = await _service.GetEmployeeByIdAsync(5);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(5, result!.EmployeeId);
            Assert.Equal("Test", result.Name);
        }

        [Fact]
        public async Task GetEmployeeByIdAsync_ReturnsNull_WhenNotFound()
        {
            // Arrange
            _repoMock.Setup(r => r.GetByIdAsync(6)).ReturnsAsync((Employee?)null);

            // Act
            var result = await _service.GetEmployeeByIdAsync(6);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetEmployeesAsync_ReturnsListOfDtos()
        {
            // Arrange
            var list = new List<Employee> {
                new Employee { EmployeeId = 1, Name = "A", Vorname = "B" },
                new Employee { EmployeeId = 2, Name = "C", Vorname = "D" }
            };
            _repoMock.Setup(r => r.GetFilteredAsync(It.IsAny<EmployeeFilterDto>()))
                     .ReturnsAsync(list);
            var filter = new EmployeeFilterDto();

            // Act
            var result = await _service.GetEmployeesAsync(filter);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Contains(result, dto => dto.EmployeeId == 1);
            Assert.Contains(result, dto => dto.EmployeeId == 2);
            _repoMock.Verify(r => r.GetFilteredAsync(filter), Times.Once);
        }
    }
}