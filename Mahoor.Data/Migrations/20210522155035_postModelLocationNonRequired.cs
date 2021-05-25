using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mahoor.Data.Migrations
{
    public partial class postModelLocationNonRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Places_PlaceId",
                table: "Posts");

            migrationBuilder.AlterColumn<Guid>(
                name: "PlaceId",
                table: "Posts",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Places_PlaceId",
                table: "Posts",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Places_PlaceId",
                table: "Posts");

            migrationBuilder.AlterColumn<Guid>(
                name: "PlaceId",
                table: "Posts",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Places_PlaceId",
                table: "Posts",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
