/*
  Warnings:

  - You are about to drop the column `urgency` on the `Links` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Links" RENAME COLUMN "urgency" TO "priority";
