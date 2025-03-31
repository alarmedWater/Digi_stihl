namespace Digi_Stihl.Models;
public class ExitReason
{
    public int ExitReasonId { get; set; }             // Primary key
    public string Description { get; set; } = string.Empty;  // Type of exit (e.g. Employee resignation)
}
