/*
  Warnings:

  - A unique constraint covering the columns `[taxid]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driverId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Driver_taxid_key" ON "Driver"("taxid");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_userId_key" ON "Trip"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_driverId_key" ON "Trip"("driverId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_taxid_fkey" FOREIGN KEY ("taxid") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
