/**
 * Data Transfer Object for an exit reason.
 * Represents a reason for an employee's departure.
 */
export interface ExitReasonDto {
  /** The unique identifier for the exit reason. */
  exitReasonId: number;
  /** A short, internal code or name for the reason. */
  reason:        string;
  /** A human-readable description of the exit reason. */
  description:   string;
}
