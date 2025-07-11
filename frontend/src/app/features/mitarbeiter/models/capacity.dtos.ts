/**
 * Data Transfer Object for filtering capacity deviations.
 */
export interface CapacityFilterDto {
  /** Optional: Filter by employee name. */
  employeeName?: string;
  /** Optional: Start date for filtering deviations (ISO yyyy-MM-dd). */
  startDate?:    string;
  /** Optional: End date for filtering deviations (ISO yyyy-MM-dd). */
  endDate?:      string;
  /** Optional: Filter by department code. */
  departmentCode?: string;
}

/**
 * Data Transfer Object for creating a new capacity deviation.
 */
export interface CreateCapacityDeviationDto {
  /** The ID of the employee for whom the deviation is created. */
  employeeId:      number;
  /** The start date of the deviation (ISO yyyy-MM-dd). */
  startDate:       string;
  /** The end date of the deviation (ISO yyyy-MM-dd). */
  endDate:         string;
  /** The new capacity value for the employee during the deviation period. */
  neueKapazitaet:  number;
  /** Optional: A remark or note about the deviation. */
  bemerkung?:      string;
}

/**
 * Data Transfer Object for an existing capacity deviation.
 */
export interface CapacityDeviationDto {
  /** The unique identifier for the capacity deviation. */
  capacityDeviationId: number;
  /** The ID of the employee associated with the deviation. */
  employeeId:          number;
  /** The start date of the deviation (ISO string). */
  startDate:           string;
  /** The end date of the deviation (ISO string). */
  endDate:             string;
  /** The new capacity value for the employee during the deviation period. */
  neueKapazitaet:      number;
  /** Optional: A remark or note about the deviation. */
  bemerkung?:          string;
}

/**
 * Individual employee capacity data for the 24-month overview.
 */
export interface EmployeeCapacityDto {
  /** The ID of the employee. */
  employeeId:   number;
  /** The name of the employee. */
  name:         string;
  /** The base Full-Time Equivalent (FTE) of the employee. */
  baseFte:      number;
  /** An array of 24 numbers representing FTE deviations over 24 months. */
  deviations:   number[]; // Length 24
}

/**
 * Summary of capacity per department.
 */
export interface DepartmentCapacityOverviewDto {
  /** The code of the department. */
  departmentCode: string;
  /** The name of the department. */
  departmentName: string;
  /** The total headcount in the department. */
  headCount:      number;
  /** An array of 24 numbers representing subtotal FTE per month for the department. */
  subtotalFte:    number[];   // Length 24
  /** An array of EmployeeCapacityDto objects for employees in this department. */
  employees:      EmployeeCapacityDto[];
}

/**
 * Data Transfer Object for the direct capacity overview.
 */
export interface DirectCapacityOverviewDto {
  /** The starting year for the overview. */
  startYear:   number;
  /** The starting month for the overview. */
  startMonth:  number;
  /** An array of DepartmentCapacityOverviewDto objects. */
  departments: DepartmentCapacityOverviewDto[];
}

/**
 * Data Transfer Object for the indirect capacity overview.
 */
export interface IndirectCapacityOverviewDto {
  /** The starting year for the overview. */
  startYear:   number;
  /** The starting month for the overview. */
  startMonth:  number;
  /** An array of DepartmentCapacityOverviewDto objects. */
  departments: DepartmentCapacityOverviewDto[];
}
