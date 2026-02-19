using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryIdInStudentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Students");

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Students",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_CountryId",
                table: "Students",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_CountryId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Students");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Students",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
