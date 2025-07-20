/**
 * Represents a department with its cost center, name, and area number.
 */
export interface DepartmentDto {
  /** The unique cost center code for the department. */
  kostenstelle: string;
  /** The name of the department. */
  abteilungsname: string;
  /** The area number to which the department belongs. */
  bereichsnummer: string;
}
