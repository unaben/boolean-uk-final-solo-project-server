/*
  Warnings:

  - You are about to drop the column `latitude` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `dropoff_postcode` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_postcode` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "dropoff_postcode" TEXT NOT NULL,
ADD COLUMN     "pickup_postcode" TEXT NOT NULL;
