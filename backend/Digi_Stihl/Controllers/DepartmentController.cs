// Digi_Stihl/Controllers/DepartmentController.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Digi_Stihl.DTOs;
using Digi_Stihl.Services;

namespace Digi_Stihl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _svc;
        public DepartmentsController(IDepartmentService svc) => _svc = svc;

        // GET api/departments
        [HttpGet]
        public async Task<ActionResult<IList<DepartmentDto>>> GetAll()
            => Ok(await _svc.GetAllAsync());

        // GET api/departments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> Get(string id)
        {
            var dto = await _svc.GetByKeyAsync(id);
            return dto == null ? NotFound() : Ok(dto);
        }
    }
}
