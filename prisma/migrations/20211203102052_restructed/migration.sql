/*
  Warnings:

  - You are about to drop the column `contactId` on the `Taxi` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactId_fkey";

-- DropIndex
DROP INDEX "Taxi_contactId_key";

-- DropIndex
DROP INDEX "User_contactId_key";

-- AlterTable
ALTER TABLE "Taxi" DROP COLUMN "contactId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactId";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
