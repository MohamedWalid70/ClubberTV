using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubberTV.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeStatusColumnType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Matches",
                type: "int",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Status",
                table: "Matches",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
