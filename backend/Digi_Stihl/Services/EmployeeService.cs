using Digi_Stihl.DTOs;
using Digi_Stihl.Models;
using Digi_Stihl.Repositories;

namespace Digi_Stihl.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repo;

    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<Employee> CreateEmployeeAsync(EmployeeDto dto)
    {
        var entity = new Employee
        {
            Name = dto.Name,
            Vorname = dto.Vorname,
            Eintritt = dto.Eintritt,
            Befristung = dto.Befristung,
            Verlaengerung1 = dto.Verlaengerung1,
            Verlaengerung2 = dto.Verlaengerung2,
            BefristungMax = dto.BefristungMax,
            Freistellung = dto.Freistellung,
            Kuendigung = dto.Kuendigung,
            Austrittsart = dto.Austrittsart,
            Bemerkung = dto.Bemerkung,
            Funktion = dto.Funktion,
            Kostenstelle = dto.Kostenstelle,
            FTE = dto.FTE,
            Bereich = dto.Bereich,
            Mengenabhaengig = dto.Mengenabhaengig,
            Arbeitsverhaeltnis = dto.Arbeitsverhaeltnis
        };

        await _repo.AddAsync(entity);
        return entity;
    }

    public async Task<Employee?> UpdateEmployeeAsync(int id, EmployeeDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return null;

        // Feldaktualisierung
        existing.Name = dto.Name;
        existing.Vorname = dto.Vorname;
        existing.Eintritt = dto.Eintritt;
        existing.Befristung = dto.Befristung;
        existing.Verlaengerung1 = dto.Verlaengerung1;
        existing.Verlaengerung2 = dto.Verlaengerung2;
        existing.BefristungMax = dto.BefristungMax;
        existing.Freistellung = dto.Freistellung;
        existing.Kuendigung = dto.Kuendigung;
        existing.Austrittsart = dto.Austrittsart;
        existing.Bemerkung = dto.Bemerkung;
        existing.Funktion = dto.Funktion;
        existing.Kostenstelle = dto.Kostenstelle;
        existing.FTE = dto.FTE;
        existing.Bereich = dto.Bereich;
        existing.Mengenabhaengig = dto.Mengenabhaengig;
        existing.Arbeitsverhaeltnis = dto.Arbeitsverhaeltnis;

        await _repo.UpdateAsync(existing);
        return existing;
    }

    public async Task<bool> DeleteEmployeeAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return false;

        await _repo.DeleteByIdAsync(id);
        return true;
    }

    public Task<Employee?> GetEmployeeByIdAsync(int id)
        => _repo.GetByIdAsync(id);

    public Task<IList<Employee>> GetEmployeesAsync(EmployeeFilterDto filters)
        => _repo.GetFilteredAsync(filters);
}
