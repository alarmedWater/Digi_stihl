//DTOs/ExitReasonDto.cs
namespace Digi_Stihl.DTOs
{
    public class ExitReasonDto
    {
        public int ExitReasonId { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}