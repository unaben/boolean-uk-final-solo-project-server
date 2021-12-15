/*
  Warnings:

  - You are about to drop the column `driverId` on the `Taxi` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taxiId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxiId` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Taxi" DROP CONSTRAINT "Taxi_driverId_fkey";

-- DropIndex
DROP INDEX "Taxi_driverId_key";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "taxiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Taxi" DROP COLUMN "driverId";

-- CreateIndex
CREATE UNIQUE INDEX "Driver_taxiId_key" ON "Driver"("taxiId");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
