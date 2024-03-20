/*
  Warnings:

  - You are about to drop the column `type` on the `amenities` table. All the data in the column will be lost.
  - The primary key for the `employed_by` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `public_user_id` on the `employed_by` table. All the data in the column will be lost.
  - You are about to drop the column `yearly_salary` on the `employed_by` table. All the data in the column will be lost.
  - The primary key for the `management_companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `management_companies` table. All the data in the column will be lost.
  - You are about to drop the column `locker_count` on the `management_companies` table. All the data in the column will be lost.
  - You are about to drop the column `parking_count` on the `management_companies` table. All the data in the column will be lost.
  - The primary key for the `public_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `public_users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `public_users` table. All the data in the column will be lost.
  - You are about to drop the column `complete_by` on the `requests` table. All the data in the column will be lost.
  - The primary key for the `reserved_by` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `facility_id` on the `reserved_by` table. All the data in the column will be lost.
  - You are about to drop the `belongs_to` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `common_facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `holder_of` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `owned_by` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registration_key` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `employee_user_id` to the `employed_by` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `management_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `management_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `public_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `public_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `public_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amenities_id` to the `reserved_by` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('renter', 'owner', 'none');

-- DropForeignKey
ALTER TABLE "belongs_to" DROP CONSTRAINT "belongs_to_common_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "belongs_to" DROP CONSTRAINT "belongs_to_property_id_fkey";

-- DropForeignKey
ALTER TABLE "condo_management_files" DROP CONSTRAINT "condo_management_files_company_id_fkey";

-- DropForeignKey
ALTER TABLE "employed_by" DROP CONSTRAINT "employed_by_company_id_fkey";

-- DropForeignKey
ALTER TABLE "employed_by" DROP CONSTRAINT "employed_by_public_user_id_fkey";

-- DropForeignKey
ALTER TABLE "holder_of" DROP CONSTRAINT "holder_of_amenities_id_fkey";

-- DropForeignKey
ALTER TABLE "holder_of" DROP CONSTRAINT "holder_of_public_user_id_fkey";

-- DropForeignKey
ALTER TABLE "management_companies" DROP CONSTRAINT "management_companies_id_fkey";

-- DropForeignKey
ALTER TABLE "owned_by" DROP CONSTRAINT "owned_by_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "owned_by" DROP CONSTRAINT "owned_by_property_id_fkey";

-- DropForeignKey
ALTER TABLE "public_users" DROP CONSTRAINT "public_users_id_fkey";

-- DropForeignKey
ALTER TABLE "registration_key" DROP CONSTRAINT "registration_key_company_id_fkey";

-- DropForeignKey
ALTER TABLE "registration_key" DROP CONSTRAINT "registration_key_property_id_fkey";

-- DropForeignKey
ALTER TABLE "registration_key" DROP CONSTRAINT "registration_key_public_user_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_condo_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "reserved_by" DROP CONSTRAINT "reserved_by_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "reserved_by" DROP CONSTRAINT "reserved_by_public_user_id_fkey";

-- DropIndex
DROP INDEX "management_companies_company_name_address_key";

-- DropIndex
DROP INDEX "public_users_username_key";

-- AlterTable
ALTER TABLE "amenities" DROP COLUMN "type",
ALTER COLUMN "text_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "condo_management_files" ADD COLUMN     "property_id" INTEGER;

-- AlterTable
ALTER TABLE "employed_by" DROP CONSTRAINT "employed_by_pkey",
DROP COLUMN "public_user_id",
DROP COLUMN "yearly_salary",
ADD COLUMN     "employee_user_id" INTEGER NOT NULL,
ADD CONSTRAINT "employed_by_pkey" PRIMARY KEY ("employee_user_id", "company_id");

-- AlterTable
ALTER TABLE "management_companies" DROP CONSTRAINT "management_companies_pkey",
DROP COLUMN "id",
DROP COLUMN "locker_count",
DROP COLUMN "parking_count",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "management_companies_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "property" ADD COLUMN     "company_id" INTEGER,
ALTER COLUMN "unit_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public_users" DROP CONSTRAINT "public_users_pkey",
DROP COLUMN "id",
DROP COLUMN "username",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "role" "user_role" DEFAULT 'none',
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "public_users_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "complete_by";

-- AlterTable
ALTER TABLE "reserved_by" DROP CONSTRAINT "reserved_by_pkey",
DROP COLUMN "facility_id",
ADD COLUMN     "amenities_id" INTEGER NOT NULL,
ALTER COLUMN "start_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "end_date" DROP NOT NULL,
ADD CONSTRAINT "reserved_by_pkey" PRIMARY KEY ("public_user_id", "amenities_id", "start_date");

-- DropTable
DROP TABLE "belongs_to";

-- DropTable
DROP TABLE "common_facilities";

-- DropTable
DROP TABLE "holder_of";

-- DropTable
DROP TABLE "owned_by";

-- DropTable
DROP TABLE "registration_key";

-- DropEnum
DROP TYPE "amenities_type";

-- CreateTable
CREATE TABLE "employee_users" (
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "profile_image_key" TEXT,

    CONSTRAINT "employee_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "registration" (
    "registration_key" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "registration_type" NOT NULL,
    "issued_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),
    "public_user_id" INTEGER,
    "property_id" INTEGER,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("registration_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_property_id_start_date_end_date_key" ON "registration"("property_id", "start_date", "end_date");

-- AddForeignKey
ALTER TABLE "condo_management_files" ADD CONSTRAINT "condo_management_files_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "condo_management_files" ADD CONSTRAINT "condo_management_files_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employed_by" ADD CONSTRAINT "employed_by_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employed_by" ADD CONSTRAINT "employed_by_employee_user_id_fkey" FOREIGN KEY ("employee_user_id") REFERENCES "employee_users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "management_companies" ADD CONSTRAINT "management_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public_users" ADD CONSTRAINT "public_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_condo_owner_id_fkey" FOREIGN KEY ("condo_owner_id") REFERENCES "public_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_by" ADD CONSTRAINT "reserved_by_amenities_id_fkey" FOREIGN KEY ("amenities_id") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_by" ADD CONSTRAINT "reserved_by_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_users" ADD CONSTRAINT "employee_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
