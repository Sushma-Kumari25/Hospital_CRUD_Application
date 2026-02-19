using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class AddedDoctorPhotos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "photopath",
                table: "Patients",
                newName: "PhotoPath");

            migrationBuilder.AddColumn<string>(
                name: "Photo1Path",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo2Path",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo1Path",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Photo2Path",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "PhotoPath",
                table: "Patients",
                newName: "photopath");
        }
    }
}
