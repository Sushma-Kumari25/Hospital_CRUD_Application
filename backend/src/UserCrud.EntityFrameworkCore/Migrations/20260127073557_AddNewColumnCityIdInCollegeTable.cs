using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnCityIdInCollegeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Collages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Collages_CityId",
                table: "Collages",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Collages_Cities_CityId",
                table: "Collages",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collages_Cities_CityId",
                table: "Collages");

            migrationBuilder.DropIndex(
                name: "IX_Collages_CityId",
                table: "Collages");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Collages");
        }
    }
}
