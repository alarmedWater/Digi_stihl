import { ExitReasonDto } from './exit-reason';

/**
 * Data Transfer Object for an Employee.
 * Represents the details of an employee, including personal, employment, and organizational data.
 */
export interface EmployeeDto {
  /** Unique identifier for the employee. Null for new employees. */
  employeeId?: number;
  /** Last name of the employee. */
  name: string;
  /** First name of the employee. */
  vorname: string;
  /** Entry date of the employee (ISO date string, e.g., "2025-06-16"). */
  eintritt: string;
  /** Start date of fixed-term contract, if applicable. */
  befristung?: string;
  /** First extension date of fixed-term contract, if applicable. */
  verlaengerung1?: string;
  /** Second extension date of fixed-term contract, if applicable. */
  verlaengerung2?: string;
  /** Maximum end date of fixed-term contract, if applicable. */
  befristungMax?: string;
  /** Date of release from duty, if applicable. */
  freistellung?: string;
  /** Date of termination, if applicable. */
  kuendigung?: string;

  /** Type of exit, if applicable. */
  austrittsart?: string;

  /** ID of the exit reason, if applicable. */
  exitReasonId?: number;
  /** Details of the exit reason, if applicable. */
  exitReason?: ExitReasonDto;

  /** Function or role of the employee. */
  funktion?: string;

  /** General remarks or notes about the employee. */
  bemerkung?: string;

  /** Cost center code of the employee. */
  kostenstelle: string;
  /** Full-Time Equivalent (FTE) of the employee. */
  fte: number;

  /** Employment relationship type. Enums are serialized as strings. */
  arbeitsverhaeltnis: 'Befristet' | 'Unbefristet';
  /** Area of employment. Enums are serialized as strings. */
  bereich: 'Direkt' | 'Indirekt';

  /** Indicates if the employee's capacity is quantity-dependent. */
  mengenabhaengig: boolean;
}
