// Models/ExitReason.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Digi_Stihl.Models
{
    // 1) Enum mit fünf Austrittsgründen
    public enum ExitReasonType
    {
        AN_Kuendigung,       // Kündigung durch Arbeitnehmer
        AG_Kuendigung,       // Kündigung durch Arbeitgeber
        Altersteilzeit,      // ATZ
        Ruhestand,           // Eintritt in den Ruhestand
        Probezeitende        // Ende der Probezeit
    }

    // 2) Entity-Klasse, speichert den Enum-Wert
    public class ExitReason
    {
        [Key]
        public int ExitReasonId { get; set; }

        [Required]
        public ExitReasonType Reason { get; set; }

        // Optional: Falls du eine frei editierbare Beschreibung möchtest
        public string Description { get; set; } = string.Empty;
    }
}
