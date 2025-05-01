/*
  Warnings:

  - A unique constraint covering the columns `[localGoogleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleResourceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleResourceId" TEXT,
ADD COLUMN     "localGoogleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_localGoogleId_key" ON "User"("localGoogleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleResourceId_key" ON "User"("googleResourceId");
