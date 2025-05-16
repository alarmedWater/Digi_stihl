using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Services;
using Microsoft.AspNetCore.Mvc;

namespace Digi_Stihl.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _service;
    public EmployeesController(IEmployeeService service) => _service = service;

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> Get(int id)
    {
        var emp = await _service.GetEmployeeByIdAsync(id);
        if (emp == null) return NotFound();
        return Ok(emp);
    }

    [HttpGet]
    public async Task<ActionResult<IList<Employee>>> Get([FromQuery] EmployeeFilterDto filters)
        => Ok(await _service.GetEmployeesAsync(filters));

    [HttpPost]
    public async Task<ActionResult<Employee>> Create(EmployeeDto dto)
    {
        var created = await _service.CreateEmployeeAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = created.EmployeeId }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Employee>> Update(int id, EmployeeDto dto)
    {
        var updated = await _service.UpdateEmployeeAsync(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!await _service.DeleteEmployeeAsync(id))
            return NotFound();
        return NoContent();
    }
}
