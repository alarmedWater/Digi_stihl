// src/app/features/models/employee-filter.ts

/**
 * Data Transfer Object für das Filtern von Mitarbeitern in der REST-API
 */
export interface EmployeeFilterDto {
  /** Nachname-Teilstring */
  name?: string;
  /** Vorname-Teilstring */
  vorname?: string;
  /** Eintrittsdatum ab (ISO-String, z.B. "2025-01-15") */
  eintrittFrom?: string;
  /** Eintrittsdatum bis (ISO-String) */
  eintrittTo?: string;
  /** Funktion-Teilstring */
  funktion?: string;
  /** Kostenstellen-Code */
  kostenstelle?: string;
  /** Bereichstyp, z.B. "Direkt" oder "Indirekt" */
  bereich?: 'Direkt' | 'Indirekt';
  /** Mengenabhängig (falls verwendet) */
  mengenabhaengig?: string;
  /** Arbeitsverhältnis, z.B. "Befristet" или "Unbefristet" */
  arbeitsverhaeltnis?: 'Befristet' | 'Unbefristet';
  /** Austrittsart (optional) */
  austrittsart?: string;
  /** Minimale FTE */
  minFTE?: number;
  /** Maximale FTE */
  maxFTE?: number;
}
