/*
  Warnings:

  - You are about to drop the `mailingList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recentlySent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recentlySent" DROP CONSTRAINT "recentlySent_mailingListId_fkey";

-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_mailingListId_fkey";

-- DropTable
DROP TABLE "mailingList";

-- DropTable
DROP TABLE "recentlySent";

-- DropTable
DROP TABLE "recipient";
