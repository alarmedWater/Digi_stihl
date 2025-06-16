using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Digi_Stihl.DTOs;
using Digi_Stihl.Services;

namespace Digi_Stihl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CapacityController : ControllerBase
    {
        private readonly ICapacityService _service;
        public CapacityController(ICapacityService service) => _service = service;

        /// <summary>
        /// GET /api/capacities/deviations
        /// Liefert gefilterte Kapazitätsabweichungen.
        /// </summary>
        [HttpGet("deviations")]
        public async Task<ActionResult<IList<CapacityDeviationDto>>> GetDeviations([FromQuery] CapacityFilterDto filter)
        {
            var deviations = await _service.GetDeviationsAsync(filter);
            return Ok(deviations);
        }

        /// <summary>
        /// POST /api/capacities/deviations
        /// Legt neue Kapazitätsabweichungen an.
        /// </summary>
        [HttpPost("deviations")]
        public async Task<ActionResult<IList<CapacityDeviationDto>>> CreateDeviation([FromBody] CreateCapacityDeviationDto dto)
        {
            var created = await _service.CreateDeviationAsync(dto);
            return CreatedAtAction(nameof(GetDeviations), created);
        }

        /// <summary>
        /// GET /api/capacities/direct-overview
        /// Liefert die direkte Kapazitätsübersicht (24 Monate ab Start).
        /// </summary>
        [HttpGet("direct-overview")]
        public async Task<ActionResult<DirectCapacityOverviewDto>> GetDirectOverview([FromQuery] int? startYear, [FromQuery] int? startMonth)
        {
            var today = DateTime.Today;
            var sy = startYear ?? today.Year;
            var sm = startMonth ?? today.Month;
            var overview = await _service.GetDirectCapacityOverviewAsync(sy, sm);
            return Ok(overview);
        }

        /// <summary>
        /// GET /api/capacities/indirect-overview
        /// Liefert die indirekte Kapazitätsübersicht (24 Monate ab Start).
        /// </summary>
        [HttpGet("indirect-overview")]
        public async Task<ActionResult<IndirectCapacityOverviewDto>> GetIndirectOverview([FromQuery] int? startYear, [FromQuery] int? startMonth)
        {
            var today = DateTime.Today;
            var sy = startYear ?? today.Year;
            var sm = startMonth ?? today.Month;
            var overview = await _service.GetIndirectCapacityOverviewAsync(sy, sm);
            return Ok(overview);
        }
    }
}
