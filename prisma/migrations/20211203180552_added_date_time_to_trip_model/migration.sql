/*
  Warnings:

  - Changed the type of `pickup_time` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "pickup_time",
ADD COLUMN     "pickup_time" TIMESTAMP(3) NOT NULL;
