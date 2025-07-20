using System.ComponentModel.DataAnnotations;

namespace Digi_Stihl.Models;

public class FluctuationReport
{
    [Key]
    public int FluctuationReportId { get; set; }

    /// <summary>
    /// The year of the report.
    /// </summary>
    public int Jahr { get; set; }

    /// <summary>
    /// The month of the report.
    /// </summary>
    public int Monat { get; set; }

    /// <summary>
    /// Terminations by employer.
    /// </summary>
    public int AGKuendigungen { get; set; }

    /// <summary>
    /// Resignations by employee.
    /// </summary>
    public int ANKuendigungen { get; set; }

    /// <summary>
    /// Other terminations.
    /// </summary>
    public int SonstigeKuendigungen { get; set; }

    /// <summary>
    /// Total number of employees.
    /// </summary>
    public int Gesamtmitarbeiter { get; set; }

    /// <summary>
    /// Fluctuation rate.
    /// </summary>
    public decimal Fluktuationsrate { get; set; }
}
