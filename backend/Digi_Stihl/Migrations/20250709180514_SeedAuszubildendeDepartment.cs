using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Digi_Stihl.Migrations
{
    /// <inheritdoc />
    public partial class SeedAuszubildendeDepartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Kostenstelle", "Abteilungsname", "Bereichsnummer" },
                values: new object[] { "D007", "Auszubildende", "07" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Kostenstelle",
                keyValue: "D007");
        }
    }
}
