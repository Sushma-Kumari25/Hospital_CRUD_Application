using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoPath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "photopath",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "photopath",
                table: "Patients");
        }
    }
}
