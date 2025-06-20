using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Digi_Stihl.Migrations
{
    /// <inheritdoc />
    public partial class AddMengenabhaengigToEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Mengenabhaengig",
                table: "Employees",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mengenabhaengig",
                table: "Employees");
        }
    }
}
