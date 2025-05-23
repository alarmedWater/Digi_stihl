export interface EmployeeDto {
  employeeId?: number;   // optional beim Anlegen
  name:        string;
  vorname:     string;
  eintritt:    string;   // ISO-Datum, z.B. "2025-05-23"
  befristung?: string;
  verlaengerung1?: string;
  verlaengerung2?: string;
  befristungMax?: string;
  freistellung?: string;
  kuendigung?: string;
  austrittsart: string;
  bemerkung?:    string;
  funktion:      string;
  kostenstelle:  string;
  fte:           number;
  bereich:       string;
  mengenabhaengig: string;
  arbeitsverhaeltnis: string;
}
