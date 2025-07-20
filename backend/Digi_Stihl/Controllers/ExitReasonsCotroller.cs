// Controllers/ExitReasonsController.cs
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Digi_Stihl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ExitReasonsController : ControllerBase
    {
        private readonly IExitReasonRepository _repo;
        private readonly IMapper _mapper;

        public ExitReasonsController(IExitReasonRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns all exit reasons.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IList<ExitReasonDto>>> Get()
        {
            var entities = await _repo.GetAllAsync();
            var dtos     = _mapper.Map<IList<ExitReasonDto>>(entities);
            return Ok(dtos);
        }
    }
}
