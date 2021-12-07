-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "postcode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "taxiId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxi" (
    "id" SERIAL NOT NULL,
    "business_name" TEXT NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "Taxi_pkey" PRIMARY KEY ("id")
);
