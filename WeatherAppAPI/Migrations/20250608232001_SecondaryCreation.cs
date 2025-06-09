using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeatherAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class SecondaryCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "User",
                newName: "Username");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "User",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "User",
                newName: "Name");
        }
    }
}
