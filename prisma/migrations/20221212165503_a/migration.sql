/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userOwnerAddress` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userOwnerName` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
DROP COLUMN "id",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "userOwnerAddress" TEXT NOT NULL,
ADD COLUMN     "userOwnerName" TEXT NOT NULL;
