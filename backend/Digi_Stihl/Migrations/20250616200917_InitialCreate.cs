using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Digi_Stihl.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Kostenstelle = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Abteilungsname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bereichsnummer = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Kostenstelle);
                });

            migrationBuilder.CreateTable(
                name: "ExitReasons",
                columns: table => new
                {
                    ExitReasonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Reason = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExitReasons", x => x.ExitReasonId);
                });

            migrationBuilder.CreateTable(
                name: "FluctuationReports",
                columns: table => new
                {
                    FluctuationReportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Jahr = table.Column<int>(type: "int", nullable: false),
                    Monat = table.Column<int>(type: "int", nullable: false),
                    AGKuendigungen = table.Column<int>(type: "int", nullable: false),
                    ANKuendigungen = table.Column<int>(type: "int", nullable: false),
                    SonstigeKuendigungen = table.Column<int>(type: "int", nullable: false),
                    Gesamtmitarbeiter = table.Column<int>(type: "int", nullable: false),
                    Fluktuationsrate = table.Column<decimal>(type: "decimal(5,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FluctuationReports", x => x.FluctuationReportId);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vorname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Eintritt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Befristung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Verlaengerung1 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Verlaengerung2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BefristungMax = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Freistellung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Kuendigung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Arbeitsverhaeltnis = table.Column<int>(type: "int", nullable: false),
                    Bereich = table.Column<int>(type: "int", nullable: false),
                    FTE = table.Column<decimal>(type: "decimal(3,2)", nullable: false),
                    Kostenstelle = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Funktion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bemerkung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExitReasonId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_Kostenstelle",
                        column: x => x.Kostenstelle,
                        principalTable: "Departments",
                        principalColumn: "Kostenstelle");
                    table.ForeignKey(
                        name: "FK_Employees_ExitReasons_ExitReasonId",
                        column: x => x.ExitReasonId,
                        principalTable: "ExitReasons",
                        principalColumn: "ExitReasonId");
                });

            migrationBuilder.CreateTable(
                name: "CapacityDeviations",
                columns: table => new
                {
                    CapacityDeviationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    NeueKapazitaet = table.Column<decimal>(type: "decimal(5,2)", nullable: false),
                    Bemerkung = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapacityDeviations", x => x.CapacityDeviationId);
                    table.ForeignKey(
                        name: "FK_CapacityDeviations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Kostenstelle", "Abteilungsname", "Bereichsnummer" },
                values: new object[,]
                {
                    { "D001", "Produktion", "01" },
                    { "D002", "Vertrieb", "02" },
                    { "D003", "Personal", "03" },
                    { "D004", "IT", "04" },
                    { "D005", "Verwaltung", "05" }
                });

            migrationBuilder.InsertData(
                table: "ExitReasons",
                columns: new[] { "ExitReasonId", "Description", "Reason" },
                values: new object[,]
                {
                    { 1, "Eigenkündigung", 0 },
                    { 2, "Kündigung durch Arbeitgeber", 1 },
                    { 3, "Eintritt in Altersteilzeit", 2 },
                    { 4, "Ruhestand", 3 },
                    { 5, "Ende der Probezeit", 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CapacityDeviations_EmployeeId_Year_Month",
                table: "CapacityDeviations",
                columns: new[] { "EmployeeId", "Year", "Month" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ExitReasonId",
                table: "Employees",
                column: "ExitReasonId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Kostenstelle",
                table: "Employees",
                column: "Kostenstelle");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CapacityDeviations");

            migrationBuilder.DropTable(
                name: "FluctuationReports");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "ExitReasons");
        }
    }
}
