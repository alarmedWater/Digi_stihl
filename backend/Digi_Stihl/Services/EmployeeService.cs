using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Repositories;

namespace Digi_Stihl.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repo;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        public async Task<EmployeeDto> CreateEmployeeAsync(EmployeeCreateDto dto)
        {
            // DTO -> Entity
            var entity = _mapper.Map<Employee>(dto);

            // GUID einmalig generieren
            entity.EmployeeGuid = Guid.NewGuid();

            // Speichern
            await _repo.AddAsync(entity);

            // Entity (with generated ID) -> DTO
            return _mapper.Map<EmployeeDto>(entity);
        }

        public async Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto dto)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) 
                return null;

            // Map incoming DTO onto existing entity
            _mapper.Map(dto, existing);
            await _repo.UpdateAsync(existing);

            // Return updated DTO
            return _mapper.Map<EmployeeDto>(existing);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) 
                return false;

            await _repo.DeleteByIdAsync(id);
            return true;
        }

        public async Task<EmployeeDto?> GetEmployeeByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null 
                ? null 
                : _mapper.Map<EmployeeDto>(entity);
        }

        public async Task<IList<EmployeeDto>> GetEmployeesAsync(EmployeeFilterDto filters)
        {
            var entities = await _repo.GetFilteredAsync(filters);
            return _mapper.Map<IList<EmployeeDto>>(entities);
        }
    }
}
