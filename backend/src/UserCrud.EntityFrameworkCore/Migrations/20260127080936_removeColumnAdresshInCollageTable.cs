using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class removeColumnAdresshInCollageTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Collages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Collages",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
