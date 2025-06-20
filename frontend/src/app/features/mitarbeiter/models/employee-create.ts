// src/app/features/models/employee-create.ts
export interface EmployeeCreateDto {
  name: string;
  vorname: string;
  eintritt: string;           // ISO-String
  fte: number;
  bereich: 'Direkt' | 'Indirekt';
  arbeitsverhaeltnis: 'Befristet' | 'Unbefristet';
  kostenstelle: string;
  mengenabhaengig: boolean;

  // optional
  funktion?: string;
  befristung?: string;
  kuendigung?: string;
  bemerkung?: string;
  exitReasonId?: number;
}
