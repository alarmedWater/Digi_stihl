using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Digi_Stihl.Migrations
{
    /// <inheritdoc />
    public partial class DeviationDateRange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CapacityDeviations_EmployeeId_Year_Month",
                table: "CapacityDeviations");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "CapacityDeviations");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "CapacityDeviations");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "CapacityDeviations",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "CapacityDeviations",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_CapacityDeviations_EmployeeId_StartDate_EndDate",
                table: "CapacityDeviations",
                columns: new[] { "EmployeeId", "StartDate", "EndDate" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CapacityDeviations_EmployeeId_StartDate_EndDate",
                table: "CapacityDeviations");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "CapacityDeviations");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "CapacityDeviations");

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "CapacityDeviations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "CapacityDeviations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CapacityDeviations_EmployeeId_Year_Month",
                table: "CapacityDeviations",
                columns: new[] { "EmployeeId", "Year", "Month" },
                unique: true);
        }
    }
}
