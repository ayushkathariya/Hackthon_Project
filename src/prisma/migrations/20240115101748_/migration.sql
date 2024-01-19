/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VerifyUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Verified" AS ENUM ('Yes', 'No');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "VerifyUser" DROP CONSTRAINT "VerifyUser_pkey",
ADD COLUMN     "isVerified" "Verified" NOT NULL DEFAULT 'No',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes',
ADD CONSTRAINT "VerifyUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "VerifyUser_id_seq";
