/*
  Warnings:

  - A unique constraint covering the columns `[contactId]` on the table `Taxi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Taxi_contactId_key" ON "Taxi"("contactId");

-- AddForeignKey
ALTER TABLE "Taxi" ADD CONSTRAINT "Taxi_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
