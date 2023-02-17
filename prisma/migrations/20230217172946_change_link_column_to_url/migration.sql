/*
  Warnings:

  - You are about to drop the column `link` on the `Links` table. All the data in the column will be lost.
  - Added the required column `url` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Links" RENAME COLUMN "link" TO "url";
