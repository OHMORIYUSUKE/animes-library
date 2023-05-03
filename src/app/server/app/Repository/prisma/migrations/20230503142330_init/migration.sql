-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "cool" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "title_short1" TEXT,
    "title_short2" TEXT,
    "title_short3" TEXT,
    "title_en" TEXT,
    "public_url" TEXT NOT NULL,
    "twitter_account" TEXT NOT NULL,
    "twitter_hash_tag" TEXT,
    "cours_id" TEXT,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "sex" INTEGER NOT NULL,
    "sequel" INTEGER NOT NULL,
    "city_code" INTEGER NOT NULL,
    "city_name" TEXT NOT NULL,
    "product_companies" TEXT,
    "ogp_description" TEXT,
    "ogp_image_url" TEXT NOT NULL
);
