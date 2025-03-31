namespace Digi_Stihl.Models;
public class FluctuationReport
{
    public int FluctuationReportId { get; set; }
    public int Jahr { get; set; }
    public int Monat { get; set; }

    public int AGKuendigungen { get; set; }
    public int ANKuendigungen { get; set; }
    public int SonstigeKuendigungen { get; set; }

    public int Gesamtmitarbeiter { get; set; }
    public decimal Fluktuationsrate { get; set; }
}
