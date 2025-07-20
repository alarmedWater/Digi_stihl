// Digi_Stihl/Services/DepartmentService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Digi_Stihl.DTOs;
using Digi_Stihl.Repositories;

namespace Digi_Stihl.Services
{
    /// <summary>
    /// Provides services for managing department data.
    /// </summary>
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _repo;
        private readonly IMapper               _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="DepartmentService"/> class.
        /// </summary>
        /// <param name="repo">The department repository.</param>
        /// <param name="mapper">The AutoMapper instance.</param>
        public DepartmentService(IDepartmentRepository repo, IMapper mapper)
        {
            _repo   = repo;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves all departments asynchronously.
        /// </summary>
        /// <returns>A list of all department DTOs.</returns>
        public async Task<IList<DepartmentDto>> GetAllAsync()
        {
            var entities = await _repo.GetAllAsync();
            return _mapper.Map<IList<DepartmentDto>>(entities);
        }

        /// <summary>
        /// Retrieves a department by its cost center asynchronously.
        /// </summary>
        /// <param name="kostenstelle">The cost center of the department.</param>
        /// <returns>The department DTO if found, otherwise null.</returns>
        public async Task<DepartmentDto?> GetByKeyAsync(string kostenstelle)
        {
            var entity = await _repo.GetByKeyAsync(kostenstelle);
            return entity == null
                ? null
                : _mapper.Map<DepartmentDto>(entity);
        }
    }
}
