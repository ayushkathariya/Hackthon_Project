-- AlterTable
ALTER TABLE "VerifyUser" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '60 minutes';
