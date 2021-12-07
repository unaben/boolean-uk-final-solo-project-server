/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_taxiId_fkey";

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "taxiId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
