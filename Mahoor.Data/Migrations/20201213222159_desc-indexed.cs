using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mahoor.Data.Migrations
{
    public partial class descindexed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Description",
                table: "Reviews",
                column: "Description")
                .Annotation("Npgsql:IndexMethod", "pgroonga")
                .Annotation("Npgsql:IndexOperators", new[] { "pgroonga_varchar_full_text_search_ops_v2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reviews_Description",
                table: "Reviews");
        }
    }
}
