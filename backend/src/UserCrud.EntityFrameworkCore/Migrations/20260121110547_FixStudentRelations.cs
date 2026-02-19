using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class FixStudentRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Cities_CityId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Collages_CollegeId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_States_StateId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "CollegeId",
                table: "Students",
                newName: "CollageId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_CollegeId",
                table: "Students",
                newName: "IX_Students_CollageId");

            migrationBuilder.AlterColumn<int>(
                name: "StateId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CountryId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Cities_CityId",
                table: "Students",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Collages_CollageId",
                table: "Students",
                column: "CollageId",
                principalTable: "Collages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_States_StateId",
                table: "Students",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Cities_CityId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Collages_CollageId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_States_StateId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "CollageId",
                table: "Students",
                newName: "CollegeId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_CollageId",
                table: "Students",
                newName: "IX_Students_CollegeId");

            migrationBuilder.AlterColumn<int>(
                name: "StateId",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CountryId",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Cities_CityId",
                table: "Students",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Collages_CollegeId",
                table: "Students",
                column: "CollegeId",
                principalTable: "Collages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_States_StateId",
                table: "Students",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id");
        }
    }
}
