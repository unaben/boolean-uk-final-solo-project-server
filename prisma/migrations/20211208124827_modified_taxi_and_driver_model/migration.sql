/*
  Warnings:

  - You are about to drop the column `taxid` on the `Driver` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[driverId]` on the table `Taxi` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_taxid_fkey";

-- DropIndex
DROP INDEX "Driver_taxid_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "taxid";

-- AlterTable
ALTER TABLE "Taxi" ADD COLUMN     "driverId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Taxi_driverId_key" ON "Taxi"("driverId");

-- AddForeignKey
ALTER TABLE "Taxi" ADD CONSTRAINT "Taxi_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
