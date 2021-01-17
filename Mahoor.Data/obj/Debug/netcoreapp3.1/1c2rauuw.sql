CREATE INDEX "IX_Places_Location" ON "Places" ("Location");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201201134435_add-indexed-location', '3.1.10');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201201135315_test', '3.1.10');

ALTER TABLE "AspNetUsers" ADD "AvatarUrl" text NULL;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201202205335_user-avatar-added', '3.1.10');

ALTER TABLE "AspNetUsers" DROP COLUMN "City";

ALTER TABLE "AspNetUsers" ADD "CityId" uuid NULL;

ALTER TABLE "AspNetUsers" ADD "Favorites" text NULL;

ALTER TABLE "AspNetUsers" ADD "Website" text NULL;

CREATE TABLE "Citys" (
    "Id" uuid NOT NULL,
    "LastModifiedDate" timestamp without time zone NOT NULL,
    "CreatedDate" timestamp without time zone NOT NULL,
    "City" text NULL,
    "Province" text NULL,
    "Geom" geometry NULL,
    "Type" integer NOT NULL,
    "IsDeleted" boolean NOT NULL,
    CONSTRAINT "PK_Citys" PRIMARY KEY ("Id")
);

CREATE INDEX "IX_AspNetUsers_CityId" ON "AspNetUsers" ("CityId");

ALTER TABLE "AspNetUsers" ADD CONSTRAINT "FK_AspNetUsers_Citys_CityId" FOREIGN KEY ("CityId") REFERENCES "Citys" ("Id") ON DELETE RESTRICT;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201206155946_city-added', '3.1.10');

