-- CreateTable
CREATE TABLE "galeri" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);
