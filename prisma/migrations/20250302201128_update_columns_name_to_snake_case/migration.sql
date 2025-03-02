/*
  Warnings:

  - You are about to drop the column `addressId` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_addressId_fkey";

-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_userId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_addressId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "addressId",
DROP COLUMN "userId",
ADD COLUMN     "address_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "addressId",
DROP COLUMN "orgId",
ADD COLUMN     "address_id" TEXT,
ADD COLUMN     "org_id" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
