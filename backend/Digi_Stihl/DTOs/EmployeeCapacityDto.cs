// DTOs/CapacityDtos.cs
using System;
using System.Collections.Generic;

namespace Digi_Stihl.DTOs
{
    /// <summary>
    /// Filter-Parameter für GET /api/capacities/deviations
    /// </summary>
    public class CapacityFilterDto
    {
        public string?    EmployeeName   { get; set; }
        public DateTime?  StartDate      { get; set; }
        public DateTime?  EndDate        { get; set; }
        public string?    DepartmentCode { get; set; }
    }

    /// <summary>
    /// Eingabe-Daten für POST /api/capacities/deviations
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
    /// Einzelne Kapazitätsabweichung
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
    /// Kapazitätsdaten je Mitarbeiter für die Übersicht (24 Monate)
    /// </summary>
    public class EmployeeCapacityDto
    {
        public int         EmployeeId  { get; set; }
        public string      Name        { get; set; } = string.Empty;
        public decimal     BaseFte     { get; set; }
        public decimal[]   Deviations  { get; set; } = new decimal[24];
    }

    /// <summary>
    /// Zusammenfassung der Kapazität pro Abteilung
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
    /// Top-Level DTO für direkte Mitarbeiter-Kapazitätsübersicht
    /// </summary>
    public class DirectCapacityOverviewDto
    {
        public int                                   StartYear   { get; set; }
        public int                                   StartMonth  { get; set; }
        public List<DepartmentCapacityOverviewDto>   Departments { get; set; } = new();
    }

    /// <summary>
    /// Top-Level DTO für indirekte Mitarbeiter-Kapazitätsübersicht
    /// </summary>
    public class IndirectCapacityOverviewDto
    {
        public int                                   StartYear   { get; set; }
        public int                                   StartMonth  { get; set; }
        public List<DepartmentCapacityOverviewDto>   Departments { get; set; } = new();
    }
}
