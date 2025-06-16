using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Repositories;
using Digi_Stihl.Services;
using Moq;
using Xunit;

namespace Digi_Stihl.Tests.Services
{
    public class CapacityServiceTests
    {
        private readonly Mock<ICapacityRepository> _repoMock;
        private readonly IMapper _mapper;
        private readonly CapacityService _service;

        public CapacityServiceTests()
        {
            _repoMock = new Mock<ICapacityRepository>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CapacityDeviation, CapacityDeviationDto>().ReverseMap();
            });
            _mapper = config.CreateMapper();
            _service = new CapacityService(_repoMock.Object, _mapper);
        }

        [Fact]
        public async Task GetDeviationsAsync_ReturnsMappedDtos()
        {
            // Arrange
            var deviations = new List<CapacityDeviation>
            {
                new CapacityDeviation { CapacityDeviationId = 1, EmployeeId = 5, Year = 2025, Month = 6, NeueKapazitaet = 2.5m, Bemerkung = "Test" }
            };
            _repoMock.Setup(r => r.GetDeviationsAsync(It.IsAny<CapacityFilterDto>()))
                     .ReturnsAsync(deviations);
            var filter = new CapacityFilterDto { EmployeeName = "" };

            // Act
            var result = await _service.GetDeviationsAsync(filter);

            // Assert
            Assert.Single(result);
            Assert.Equal(1, result[0].CapacityDeviationId);
            Assert.Equal(5, result[0].EmployeeId);
            Assert.Equal(2.5m, result[0].NeueKapazitaet);
            _repoMock.Verify(r => r.GetDeviationsAsync(filter), Times.Once);
        }

        [Fact]
        public async Task CreateDeviationAsync_Throws_WhenExisting()
        {
            // Arrange
            var dto = new CreateCapacityDeviationDto
            {
                EmployeeId = 1,
                StartYear = 2025,
                StartMonth = 1,
                EndYear = 2025,
                EndMonth = 1,
                NeueKapazitaet = 1m
            };
            _repoMock.Setup(r => r.GetDeviationsAsync(It.IsAny<CapacityFilterDto>()))
                     .ReturnsAsync(new List<CapacityDeviation> { new CapacityDeviation() });

            // Act & Assert
            await Assert.ThrowsAsync<InvalidOperationException>(
                () => _service.CreateDeviationAsync(dto)
            );
        }

        [Fact]
        public async Task CreateDeviationAsync_SavesNewEntries()
        {
            // Arrange
            var dto = new CreateCapacityDeviationDto
            {
                EmployeeId = 2,
                StartYear = 2025,
                StartMonth = 1,
                EndYear = 2025,
                EndMonth = 3,
                NeueKapazitaet = 0.5m
            };
            _repoMock.Setup(r => r.GetDeviationsAsync(It.IsAny<CapacityFilterDto>()))
                     .ReturnsAsync(new List<CapacityDeviation>());
            _repoMock.Setup(r => r.AddDeviationsAsync(It.IsAny<IEnumerable<CapacityDeviation>>()))
                     .Returns(Task.CompletedTask)
                     .Verifiable();

            // Act
            var result = await _service.CreateDeviationAsync(dto);

            // Assert
            Assert.Equal(3, result.Count);
            Assert.All(result, d => Assert.Equal(0.5m, d.NeueKapazitaet));
            _repoMock.Verify();
        }
    }
}
