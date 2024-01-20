/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `VerifyUser` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heldIn` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `eventImage` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "expiresAt",
ADD COLUMN     "deadline" TEXT NOT NULL,
ADD COLUMN     "heldIn" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "eventImage" SET NOT NULL;

-- AlterTable
ALTER TABLE "VerifyUser" DROP COLUMN "role";
