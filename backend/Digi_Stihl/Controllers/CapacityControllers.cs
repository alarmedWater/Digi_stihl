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
        /// GET  /api/capacities/deviations
        /// Liefert alle Kapazitätsabweichungen gemäß Filter.
        /// </summary>
        [HttpGet("deviations")]
        public async Task<ActionResult<IList<CapacityDeviationDto>>> GetDeviations(
            [FromQuery] CapacityFilterDto filter)
        {
            var list = await _service.GetDeviationsAsync(filter);
            return Ok(list);
        }

        /// <summary>
        /// GET  /api/capacities/deviations/{id}
        /// Liefert eine einzelne Kapazitätsabweichung.
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
        /// POST /api/capacities/deviations
        /// Legt eine neue Kapazitätsabweichung an.
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
        /// PUT /api/capacities/deviations/{id}
        /// Aktualisiert eine bestehende Kapazitätsabweichung.
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
        /// DELETE /api/capacities/deviations/{id}
        /// Löscht eine Kapazitätsabweichung.
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
        /// GET  /api/capacities/direct-overview
        /// Übersicht der direkten Kapazität (24 Monate).
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
        /// GET  /api/capacities/indirect-overview
        /// Übersicht der indirekten Kapazität (24 Monate).
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
