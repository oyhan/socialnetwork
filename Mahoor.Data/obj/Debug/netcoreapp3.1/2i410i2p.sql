DROP INDEX "IX_Reviews_SearchVector";

CREATE INDEX "IX_Reviews_Description" ON "Reviews" USING pgroonga ("Description" pgroonga_varchar_full_text_search_ops_v2);

CREATE INDEX "IX_Reviews_Title" ON "Reviews" USING pgroonga ("Title" pgroonga_varchar_full_text_search_ops_v2);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20201213182825_pgroonga-fts-added', '3.1.10');

