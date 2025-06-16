// src/app/features/models/employee.ts
export interface EmployeeDto {
  employeeId?: number;       // null für Neuanlage
  name: string;
  vorname: string;
  eintritt: string;          // ISO-Datum, z.B. "2025-06-16"
  befristung?: string;
  verlaengerung1?: string;
  verlaengerung2?: string;
  befristungMax?: string;
  freistellung?: string;
  kuendigung?: string;
  arbeitsverhaeltnis: 'Befristet' | 'Unbefristet';
  bereich: 'Direkt' | 'Indirekt';
  fte: number;
  kostenstelle: string;
  funktion?: string;
  bemerkung?: string;
  exitReasonId?: number;
}
