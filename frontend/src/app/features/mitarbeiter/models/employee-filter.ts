/**
 * Data Transfer Object for filtering employees in the REST API.
 */
export interface EmployeeFilterDto {
  /** Partial string for last name. */
  name?: string;
  /** Partial string for first name. */
  vorname?: string;
  /** Entry date from (ISO string, e.g., "2025-01-15"). */
  eintrittFrom?: string;
  /** Entry date to (ISO string). */
  eintrittTo?: string;
  /** Partial string for function/role. */
  funktion?: string;
  /** Cost center code. */
  kostenstelle?: string;
  /** Area type, e.g., "Direkt" (Direct) or "Indirekt" (Indirect). */
  bereich?: 'Direkt' | 'Indirekt';
  /** Quantity-dependent (if applicable). */
  mengenabhaengig?: string;
  /** Employment relationship, e.g., "Befristet" (Fixed-term) or "Unbefristet" (Permanent). */
  arbeitsverhaeltnis?: 'Befristet' | 'Unbefristet';
  /** Type of exit (optional). */
  austrittsart?: string;
  /** Minimum Full-Time Equivalent (FTE). */
  minFTE?: number;
  /** Maximum Full-Time Equivalent (FTE). */
  maxFTE?: number;
}
