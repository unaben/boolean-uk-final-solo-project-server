/*
  Warnings:

  - You are about to drop the column `dropoff_postcode` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_postcode` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "dropoff_postcode",
DROP COLUMN "pickup_postcode",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
