// Datei: /backend/Digi_Stihl/DTOs/EmployeeDto.cs
namespace Digi_Stihl.DTOs
{
    public class EmployeeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Vorname { get; set; } = string.Empty;
        public DateTime Eintritt { get; set; }
        public DateTime? Befristung { get; set; }
        public DateTime? Verlaengerung1 { get; set; }
        public DateTime? Verlaengerung2 { get; set; }
        public DateTime? BefristungMax { get; set; }
        public DateTime? Freistellung { get; set; }
        public DateTime? Kuendigung { get; set; }
        public string Austrittsart { get; set; } = string.Empty;
        public string? Bemerkung { get; set; }
        public string Funktion { get; set; } = string.Empty;
        public string Kostenstelle { get; set; } = string.Empty;
        public decimal FTE { get; set; }
        public string Bereich { get; set; } = string.Empty;
        public string Mengenabhaengig { get; set; } = string.Empty;
        public string Arbeitsverhaeltnis { get; set; } = string.Empty;
    }
}
