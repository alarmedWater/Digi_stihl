// DTOs/CapacityDtos.cs
using System;
using System.Collections.Generic;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Filter parameters for GET /api/capacities/deviations.
    /// </summary>
    public class CapacityFilterDto
    {
        public string?    EmployeeName   { get; set; }
        public DateTime?  StartDate      { get; set; }
        public DateTime?  EndDate        { get; set; }
        public string?    DepartmentCode { get; set; }
    }

    /// <summary>
    /// Input data for POST /api/capacities/deviations.
    /// </summary>
    public class CreateCapacityDeviationDto
    {
        public int       EmployeeId     { get; set; }
        public DateTime  StartDate      { get; set; }
        public DateTime  EndDate        { get; set; }
        public decimal   NeueKapazitaet { get; set; }
        public string?   Bemerkung      { get; set; }
    }

    /// <summary>
    /// Represents a single capacity deviation.
    /// </summary>
    public class CapacityDeviationDto
    {
        public int       CapacityDeviationId { get; set; }
        public int       EmployeeId          { get; set; }
        public DateTime  StartDate           { get; set; }
        public DateTime  EndDate             { get; set; }
        public decimal   NeueKapazitaet      { get; set; }
        public string?   Bemerkung           { get; set; }
    }

    /// <summary>
    /// Capacity data per employee for the overview (24 months).
    /// </summary>
    public class EmployeeCapacityDto
    {
        public int         EmployeeId  { get; set; }
        public string      Name        { get; set; } = string.Empty;
        public decimal     BaseFte     { get; set; }
        public decimal[]   Deviations  { get; set; } = new decimal[24];
    }

    /// <summary>
    /// Summary of capacity per department.
    /// </summary>
    public class DepartmentCapacityOverviewDto
    {
        public string                     DepartmentCode { get; set; } = string.Empty;
        public string                     DepartmentName { get; set; } = string.Empty;
        public List<EmployeeCapacityDto>  Employees      { get; set; } = new();
        public decimal[]                  SubtotalFte    { get; set; } = new decimal[24];
        public int                        HeadCount      { get; set; }
    }

    /// <summary>
    /// Top-level DTO for direct employee capacity overview.
    /// </summary>
    public class DirectCapacityOverviewDto
    {
        public int                                   StartYear   { get; set; }
        public int                                   StartMonth  { get; set; }
        public List<DepartmentCapacityOverviewDto>   Departments { get; set; } = new();
    }

    /// <summary>
    /// Top-level DTO for indirect employee capacity overview.
    /// </summary>
    public class IndirectCapacityOverviewDto
    {
        public int                                   StartYear   { get; set; }
        public int                                   StartMonth  { get; set; }
        public List<DepartmentCapacityOverviewDto>   Departments { get; set; } = new();
    }
}
