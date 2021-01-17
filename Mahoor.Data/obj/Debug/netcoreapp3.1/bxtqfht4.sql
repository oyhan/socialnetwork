ALTER TABLE "Citys" ALTER COLUMN "Geom" TYPE geometry;
ALTER TABLE "Citys" ALTER COLUMN "Geom" DROP NOT NULL;
ALTER TABLE "Citys" ALTER COLUMN "Geom" DROP DEFAULT;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201207070950_cityGeometry', '3.1.10');

