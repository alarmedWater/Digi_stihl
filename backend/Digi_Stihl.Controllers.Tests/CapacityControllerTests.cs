// Tests/Controllers/CapacityControllerTests.cs
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
    public class CapacityControllerTests
    {
        private readonly Mock<ICapacityService> _serviceMock;
        private readonly CapacityController _controller;

        public CapacityControllerTests()
        {
            _serviceMock = new Mock<ICapacityService>();
            _controller = new CapacityController(_serviceMock.Object);
        }

        [Fact]
        public async Task GetDeviations_ReturnsOk_WithDeviations()
        {
            // Arrange
            var list = new List<CapacityDeviationDto>
            {
                new CapacityDeviationDto { CapacityDeviationId = 1 }
            };
            _serviceMock
                .Setup(s => s.GetDeviationsAsync(It.IsAny<CapacityFilterDto>()))
                .ReturnsAsync(list);

            // Act
            var result = await _controller.GetDeviations(new CapacityFilterDto());

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(list, ok.Value);
        }

        [Fact]
        public async Task CreateDeviation_ReturnsCreatedAtAction()
        {
            // Arrange
            var dtos = new List<CapacityDeviationDto>
            {
                new CapacityDeviationDto { CapacityDeviationId = 123 }
            };
            var createDto = new CreateCapacityDeviationDto();
            _serviceMock
                .Setup(s => s.CreateDeviationAsync(createDto))
                .ReturnsAsync(dtos);

            // Act
            var result = await _controller.CreateDeviation(createDto);

            // Assert
            var created = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(dtos, created.Value);
        }

        [Fact]
        public async Task GetDirectOverview_ReturnsOk_WithOverview()
        {
            // Arrange
            var dto = new DirectCapacityOverviewDto { StartYear = 2025, StartMonth = 6 };
            _serviceMock
                .Setup(s => s.GetDirectCapacityOverviewAsync(2025, 6))
                .ReturnsAsync(dto);

            // Act
            var result = await _controller.GetDirectOverview(2025, 6);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(dto, ok.Value);
        }

        [Fact]
        public async Task GetIndirectOverview_ReturnsOk_WithOverview()
        {
            // Arrange
            var dto = new IndirectCapacityOverviewDto { StartYear = 2025, StartMonth = 6 };
            _serviceMock
                .Setup(s => s.GetIndirectCapacityOverviewAsync(2025, 6))
                .ReturnsAsync(dto);

            // Act
            var result = await _controller.GetIndirectOverview(2025, 6);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(dto, ok.Value);
        }
    }
}
