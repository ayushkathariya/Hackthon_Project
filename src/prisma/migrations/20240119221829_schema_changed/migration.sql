/*
  Warnings:

  - You are about to drop the column `postId` on the `EventLike` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `EventLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventLike" DROP CONSTRAINT "EventLike_postId_fkey";

-- AlterTable
ALTER TABLE "EventLike" DROP COLUMN "postId",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EventLike" ADD CONSTRAINT "EventLike_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
