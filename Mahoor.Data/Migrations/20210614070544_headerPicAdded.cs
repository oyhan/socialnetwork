using Microsoft.EntityFrameworkCore.Migrations;

namespace Mahoor.Data.Migrations
{
    public partial class headerPicAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileHeaderPicture",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileHeaderPicture",
                table: "AspNetUsers");
        }
    }
}
