using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mahoor.Data.Migrations
{
    public partial class postmodelCityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CityId",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CityId",
                table: "Posts",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Citys_CityId",
                table: "Posts",
                column: "CityId",
                principalTable: "Citys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Citys_CityId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_CityId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Posts");
        }
    }
}
