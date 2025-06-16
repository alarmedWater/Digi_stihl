using Digi_Stihl.DTOs;
using Digi_Stihl.Services;
using Microsoft.AspNetCore.Mvc;

namespace Digi_Stihl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves an employee by ID.
        /// </summary>
        /// <param name="id">The ID of the employee.</param>
        /// <returns>The employee DTO.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EmployeeDto>> Get(int id)
        {
            var emp = await _service.GetEmployeeByIdAsync(id);
            if (emp == null)
                return NotFound();

            return Ok(emp);
        }

        /// <summary>
        /// Retrieves a list of employees, optional filtering.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IList<EmployeeDto>>> Get([FromQuery] EmployeeFilterDto filters)
        {
            var result = await _service.GetEmployeesAsync(filters);
            return Ok(result);
        }

        /// <summary>
        /// Creates a new employee.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<EmployeeDto>> Create([FromBody] EmployeeDto dto)
        {
            var created = await _service.CreateEmployeeAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.EmployeeId }, created);
        }

        /// <summary>
        /// Updates an existing employee.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EmployeeDto>> Update(int id, [FromBody] EmployeeDto dto)
        {
            var updated = await _service.UpdateEmployeeAsync(id, dto);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        /// <summary>
        /// Deletes an employee by ID.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteEmployeeAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
