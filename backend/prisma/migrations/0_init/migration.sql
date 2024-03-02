-- CreateEnum
CREATE TYPE "employee_role" AS ENUM ('manager', 'daily operations', 'finance', 'other');

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('declarations', 'annual budgets', 'board meeting minutes', 'other');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "registration_type" AS ENUM ('renter', 'owner');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('renter', 'owner', 'none');

-- CreateTable
CREATE TABLE "amenities" (
    "id" SERIAL NOT NULL,
    "text_id" TEXT,
    "property_id" INTEGER,
    "description" TEXT NOT NULL,
    "fee" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condo_management_files" (
    "file_key" TEXT NOT NULL,
    "file_type" "file_type" DEFAULT 'other',
    "company_id" INTEGER,
    "property_id" INTEGER,
    "description" TEXT,

    CONSTRAINT "condo_management_files_pkey" PRIMARY KEY ("file_key")
);

-- CreateTable
CREATE TABLE "employed_by" (
    "public_user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),
    "role" "employee_role" NOT NULL,

    CONSTRAINT "employed_by_pkey" PRIMARY KEY ("public_user_id","company_id")
);

-- CreateTable
CREATE TABLE "management_companies" (
    "user_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "unit_count" INTEGER DEFAULT 0,

    CONSTRAINT "management_companies_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "size" INTEGER NOT NULL,
    "condo_fee" DECIMAL(10,2) NOT NULL,
    "unit_count" INTEGER NOT NULL,
    "registration_key" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_users" (
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" "user_role" DEFAULT 'none',
    "profile_image_key" TEXT,

    CONSTRAINT "public_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "requests" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "request_priority" "priority" DEFAULT 'low',
    "issued_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condo_owner_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("condo_owner_id","employee_id","title","issued_at")
);

-- CreateTable
CREATE TABLE "reserved_by" (
    "public_user_id" INTEGER NOT NULL,
    "amenities_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),

    CONSTRAINT "reserved_by_pkey" PRIMARY KEY ("public_user_id","amenities_id","start_date")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashed_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_address" (
    "company_id" INTEGER NOT NULL,
    "country" TEXT DEFAULT 'Canada',
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "postal_code" CHAR(7) NOT NULL,
    "apartment_number" TEXT,

    CONSTRAINT "company_address_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "property_address" (
    "property_id" INTEGER NOT NULL,
    "country" TEXT DEFAULT 'Canada',
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "postal_code" CHAR(7) NOT NULL,

    CONSTRAINT "property_address_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "registration" (
    "registration_key" UUID NOT NULL,
    "type" "registration_type" NOT NULL,
    "issued_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),
    "public_user_id" INTEGER NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("registration_key","issued_at","public_user_id","property_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "amenities_id_property_id_key" ON "amenities"("id", "property_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_registration_key_key" ON "property"("registration_key");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "amenities" ADD CONSTRAINT "amenities_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "condo_management_files" ADD CONSTRAINT "condo_management_files_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "condo_management_files" ADD CONSTRAINT "condo_management_files_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employed_by" ADD CONSTRAINT "employed_by_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employed_by" ADD CONSTRAINT "employed_by_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "management_companies" ADD CONSTRAINT "management_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public_users" ADD CONSTRAINT "public_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_condo_owner_id_fkey" FOREIGN KEY ("condo_owner_id") REFERENCES "public_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_by" ADD CONSTRAINT "reserved_by_amenities_id_fkey" FOREIGN KEY ("amenities_id") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_by" ADD CONSTRAINT "reserved_by_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property_address" ADD CONSTRAINT "property_address_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_registration_key_fkey" FOREIGN KEY ("registration_key") REFERENCES "property"("registration_key") ON DELETE NO ACTION ON UPDATE NO ACTION;

