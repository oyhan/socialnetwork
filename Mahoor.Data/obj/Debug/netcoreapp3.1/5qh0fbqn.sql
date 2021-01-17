DROP INDEX "IX_Reviews_SearchVector";

CREATE INDEX "IX_Reviews_Title_Description" ON "Reviews" USING pgroonga ("Title" pgroonga_varchar_full_text_search_ops_v2, "Description");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201213172938_pgroonga-fts-added', '3.1.10');

