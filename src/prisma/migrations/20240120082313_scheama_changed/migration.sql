/*
  Warnings:

  - You are about to drop the `EventLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventLike" DROP CONSTRAINT "EventLike_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventLike" DROP CONSTRAINT "EventLike_userId_fkey";

-- DropTable
DROP TABLE "EventLike";
