/**
 * Data Transfer Object for creating a new Employee.
 * Contains the necessary fields for employee creation.
 */
export interface EmployeeCreateDto {
  /** Last name of the employee. */
  name: string;
  /** First name of the employee. */
  vorname: string;
  /** Entry date of the employee (ISO string). */
  eintritt: string;
  /** Full-Time Equivalent (FTE) of the employee. */
  fte: number;
  /** Area of employment: 'Direkt' (Direct) or 'Indirekt' (Indirect). */
  bereich: 'Direkt' | 'Indirekt';
  /** Employment relationship type: 'Befristet' (Fixed-term) or 'Unbefristet' (Permanent). */
  arbeitsverhaeltnis: 'Befristet' | 'Unbefristet';
  /** Cost center code of the employee. */
  kostenstelle: string;
  /** Indicates if the employee's capacity is quantity-dependent. */
  mengenabhaengig: boolean;

  // Optional fields
  /** Function or role of the employee. */
  funktion?: string;
  /** Start date of fixed-term contract, if applicable. */
  befristung?: string;
  /** Date of termination, if applicable. */
  kuendigung?: string;
  /** General remarks or notes about the employee. */
  bemerkung?: string;
  /** ID of the exit reason, if applicable. */
  exitReasonId?: number;
}
