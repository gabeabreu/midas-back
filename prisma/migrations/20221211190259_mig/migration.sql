-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "discord" TEXT,
    "isVerified" BOOLEAN,
    "profilePictureUrl" TEXT,
    "bannerPictureUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "mintDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_address_key" ON "Collection"("address");
