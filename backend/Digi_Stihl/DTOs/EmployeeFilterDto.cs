namespace Digi_Stihl.DTOs
{
    public class EmployeeFilterDto
    {
        public string? Name { get; set; }
        public string? Vorname { get; set; }
        public DateTime? EintrittFrom { get; set; }
        public DateTime? EintrittTo { get; set; }
        public string? Funktion { get; set; }
        public string? Kostenstelle { get; set; }
        public string? Bereich { get; set; }
        public string? Mengenabhaengig { get; set; }
        public string? Arbeitsverhaeltnis { get; set; }
        public string? Austrittsart { get; set; }
        public decimal? MinFTE { get; set; }
        public decimal? MaxFTE { get; set; }
    }
}
