// src/app/features/models/employee.ts
import { ExitReasonDto } from './exit-reason';


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

  // wenn Du im Backend die Austrittsart als String mapst, hier mit aufnehmen
  austrittsart?: string;

  exitReasonId?: number;
  exitReason?: ExitReasonDto;

  funktion?: string;

  // bemer­kung muss da sein und nullable sein
  bemerkung?: string;

  kostenstelle: string;
  fte: number;

  // Enums werden als Strings serialisiert
  arbeitsverhaeltnis: 'Befristet' | 'Unbefristet';
  bereich: 'Direkt' | 'Indirekt';


  mengenabhaengig: boolean;
}
