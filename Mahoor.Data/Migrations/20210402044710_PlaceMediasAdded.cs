using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Mahoor.Data.Migrations
{
    public partial class PlaceMediasAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Places_Medias",
                columns: table => new
                {
                    BasePlaceModelId = table.Column<Guid>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MediaType = table.Column<int>(nullable: false),
                    MimeType = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    Size = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places_Medias", x => new { x.BasePlaceModelId, x.Id });
                    table.ForeignKey(
                        name: "FK_Places_Medias_Places_BasePlaceModelId",
                        column: x => x.BasePlaceModelId,
                        principalTable: "Places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Places_Medias");
        }
    }
}
