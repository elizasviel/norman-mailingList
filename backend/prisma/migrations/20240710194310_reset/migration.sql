/*
  Warnings:

  - Made the column `mailingListId` on table `recipient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_mailingListId_fkey";

-- AlterTable
ALTER TABLE "recipient" ALTER COLUMN "mailingListId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_mailingListId_fkey" FOREIGN KEY ("mailingListId") REFERENCES "mailingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
