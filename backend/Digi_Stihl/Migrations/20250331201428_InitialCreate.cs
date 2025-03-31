using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

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
                    Fluktuationsrate = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vorname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Eintritt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Befristung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Verlaengerung1 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Verlaengerung2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BefristungMax = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Freistellung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Kuendigung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Austrittsart = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bemerkung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Funktion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kostenstelle = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FTE = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Bereich = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mengenabhaengig = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Arbeitsverhaeltnis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_Kostenstelle",
                        column: x => x.Kostenstelle,
                        principalTable: "Departments",
                        principalColumn: "Kostenstelle",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CapacityDeviations",
                columns: table => new
                {
                    CapacityDeviationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    Startdatum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Enddatum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NeueKapazitaet = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Bemerkung = table.Column<string>(type: "nvarchar(max)", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_CapacityDeviations_EmployeeId",
                table: "CapacityDeviations",
                column: "EmployeeId");

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
                name: "ExitReasons");

            migrationBuilder.DropTable(
                name: "FluctuationReports");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}
