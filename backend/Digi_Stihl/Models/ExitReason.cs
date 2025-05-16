using System.ComponentModel.DataAnnotations;

namespace Digi_Stihl.Models;

public class ExitReason
{
    [Key]
    public int ExitReasonId { get; set; }

    public string Description { get; set; } = string.Empty;
}
