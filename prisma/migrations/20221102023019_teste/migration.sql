-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilePicture" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "ProfilePicture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannerPicture" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "BannerPicture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePicture_userId_key" ON "ProfilePicture"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BannerPicture_userId_key" ON "BannerPicture"("userId");
