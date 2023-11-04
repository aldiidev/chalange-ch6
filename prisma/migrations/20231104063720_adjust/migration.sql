/*
  Warnings:

  - You are about to drop the column `url` on the `galeri` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[judul]` on the table `galeri` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `urlPic` to the `galeri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "galeri" DROP COLUMN "url",
ADD COLUMN     "urlPic" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "galeri_judul_key" ON "galeri"("judul");
