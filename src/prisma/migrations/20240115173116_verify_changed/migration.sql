/*
  Warnings:

  - You are about to drop the column `isVerified` on the `VerifyUser` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `VerifyUser` table. All the data in the column will be lost.
  - Added the required column `otp` to the `VerifyUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerifyUser" DROP COLUMN "isVerified",
DROP COLUMN "token",
ADD COLUMN     "otp" INTEGER NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '10 minutes';

-- DropEnum
DROP TYPE "Verified";
