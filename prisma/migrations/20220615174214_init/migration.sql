-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "passwordTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
