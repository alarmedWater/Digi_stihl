// Controllers/CapacityController.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Digi_Stihl.DTOs;
using Digi_Stihl.Services;

namespace Digi_Stihl.Controllers
{
    [ApiController]
    [Route("api/capacities")]
    public class CapacityController : ControllerBase
    {
        private readonly ICapacityService _service;
        public CapacityController(ICapacityService service) 
            => _service = service;

        /// <summary>
        /// Gets all capacity deviations according to the filter.
        /// </summary>
        [HttpGet("deviations")]
        public async Task<ActionResult<IList<CapacityDeviationDto>>> GetDeviations(
            [FromQuery] CapacityFilterDto filter)
        {
            var list = await _service.GetDeviationsAsync(filter);
            return Ok(list);
        }

        /// <summary>
        /// Returns a single capacity deviation.
        /// </summary>
        [HttpGet("deviations/{id}")]
        public async Task<ActionResult<CapacityDeviationDto>> GetDeviation(int id)
        {
            var dto = await _service.GetDeviationByIdAsync(id);
            if (dto == null) 
                return NotFound();
            return Ok(dto);
        }

        /// <summary>
        /// Creates a new capacity deviation.
        /// </summary>
        [HttpPost("deviations")]
        public async Task<ActionResult<CapacityDeviationDto>> CreateDeviation(
            [FromBody] CreateCapacityDeviationDto dto)
        {
            var created = await _service.CreateDeviationAsync(dto);
            return CreatedAtAction(
                nameof(GetDeviation),
                new { id = created.CapacityDeviationId },
                created
            );
        }

        /// <summary>
        /// Updates an existing capacity deviation.
        /// </summary>
        [HttpPut("deviations/{id}")]
        public async Task<ActionResult<CapacityDeviationDto>> UpdateDeviation(
            int id,
            [FromBody] CreateCapacityDeviationDto dto)
        {
            var existing = await _service.GetDeviationByIdAsync(id);
            if (existing == null)
                return NotFound();

            var updated = await _service.UpdateDeviationAsync(id, dto);
            return Ok(updated);
        }

        /// <summary>
        /// Deletes a capacity deviation.
        /// </summary>
        [HttpDelete("deviations/{id}")]
        public async Task<IActionResult> DeleteDeviation(int id)
        {
            var existing = await _service.GetDeviationByIdAsync(id);
            if (existing == null) 
                return NotFound();

            await _service.DeleteDeviationAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Overview of direct capacity (24 months).
        /// </summary>
        [HttpGet("direct-overview")]
        public async Task<ActionResult<DirectCapacityOverviewDto>> GetDirectOverview(
            [FromQuery] int? startYear,
            [FromQuery] int? startMonth)
        {
            var today = DateTime.Today;
            var sy = startYear  ?? today.Year;
            var sm = startMonth ?? today.Month;
            var overview = await _service.GetDirectCapacityOverviewAsync(sy, sm);
            return Ok(overview);
        }

        /// <summary>
        /// Overview of indirect capacity (24 months).
        /// </summary>
        [HttpGet("indirect-overview")]
        public async Task<ActionResult<IndirectCapacityOverviewDto>> GetIndirectOverview(
            [FromQuery] int? startYear,
            [FromQuery] int? startMonth)
        {
            var today = DateTime.Today;
            var sy = startYear  ?? today.Year;
            var sm = startMonth ?? today.Month;
            var overview = await _service.GetIndirectCapacityOverviewAsync(sy, sm);
            return Ok(overview);
        }
    }
}
