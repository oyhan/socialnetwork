CREATE INDEX "IX_Citys_Geom" ON "Citys"  USING GIST ("Geom");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201208052827_added-index-city', '3.1.10');

