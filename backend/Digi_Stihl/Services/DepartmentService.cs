// Digi_Stihl/Services/DepartmentService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Repositories;

namespace Digi_Stihl.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _repo;
        private readonly IMapper               _mapper;

        public DepartmentService(IDepartmentRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        public async Task<IList<DepartmentDto>> GetAllAsync()
        {
            var entities = await _repo.GetAllAsync();
            return _mapper.Map<IList<DepartmentDto>>(entities);
        }

        public async Task<DepartmentDto?> GetByKeyAsync(string kostenstelle)
        {
            var entity = await _repo.GetByKeyAsync(kostenstelle);
            return entity == null
                ? null
                : _mapper.Map<DepartmentDto>(entity);
        }
    }
}
