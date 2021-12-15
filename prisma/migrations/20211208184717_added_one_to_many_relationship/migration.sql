-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_taxiId_fkey";

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "taxiId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
