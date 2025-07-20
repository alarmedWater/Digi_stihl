// Models/ExitReason.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models
{
    /// <summary>
    /// Represents the type of exit reason.
    /// </summary>
    public enum ExitReasonType
    {
        /// <summary>
        /// Resignation by employee.
        /// </summary>
        AN_Kuendigung,
        /// <summary>
        /// Termination by employer.
        /// </summary>
        AG_Kuendigung,
        /// <summary>
        /// Partial retirement.
        /// </summary>
        Altersteilzeit,
        /// <summary>
        /// Retirement.
        /// </summary>
        Ruhestand,
        /// <summary>
        /// End of probationary period.
        /// </summary>
        Probezeitende
    }

    /// <summary>
    /// Represents an exit reason for an employee.
    /// </summary>
    public class ExitReason
    {
        [Key]
        public int ExitReasonId { get; set; }

        [Required]
        public ExitReasonType Reason { get; set; }

        /// <summary>
        /// Optional description for the exit reason.
        /// </summary>
        public string Description { get; set; } = string.Empty;
    }
}
