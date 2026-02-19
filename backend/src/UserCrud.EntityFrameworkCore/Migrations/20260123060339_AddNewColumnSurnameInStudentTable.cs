using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnSurnameInStudentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Surname",
                table: "Students");
        }
    }
}
