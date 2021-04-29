using Microsoft.EntityFrameworkCore.Migrations;

namespace Mahoor.Data.Migrations
{
    public partial class userAddedNoFoll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfFollowers",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfFollowings",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfFollowers",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "NumberOfFollowings",
                table: "AspNetUsers");
        }
    }
}
