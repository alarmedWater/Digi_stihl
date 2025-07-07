// src/app/features/mitarbeiter/models/capacity.dtos.ts

export interface CapacityFilterDto {
  employeeName?: string;
  startDate?:    string;  // ISO yyyy-MM-dd
  endDate?:      string;
  departmentCode?: string;
}

export interface CreateCapacityDeviationDto {
  employeeId:      number;
  startDate:       string;  // ISO yyyy-MM-dd
  endDate:         string;
  neueKapazitaet:  number;
  bemerkung?:      string;
}

export interface CapacityDeviationDto {
  capacityDeviationId: number;
  employeeId:          number;
  startDate:           string;  // ISO
  endDate:             string;
  neueKapazitaet:      number;
  bemerkung?:          string;
}

/**
 * Einzelne Kapazitätsdaten eines Mitarbeiters in der Übersicht
 * über 24 Monate.
 */
export interface EmployeeCapacityDto {
  employeeId:   number;
  name:         string;
  baseFte:      number;
  deviations:   number[]; // Länge 24
}

/**
 * Zusammenfassung der Kapazität pro Abteilung
 */
export interface DepartmentCapacityOverviewDto {
  departmentCode: string;
  departmentName: string;
  headCount:      number;
  subtotalFte:    number[];   // Länge 24
  employees:      EmployeeCapacityDto[];
}

/**
 * DTO für die direkte Kapazitätsübersicht
 */
export interface DirectCapacityOverviewDto {
  startYear:   number;
  startMonth:  number;
  departments: DepartmentCapacityOverviewDto[];
}

/**
 * DTO für die indirekte Kapazitätsübersicht
 */
export interface IndirectCapacityOverviewDto {
  startYear:   number;
  startMonth:  number;
  departments: DepartmentCapacityOverviewDto[];
}
