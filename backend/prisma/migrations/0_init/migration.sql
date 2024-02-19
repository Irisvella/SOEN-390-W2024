-- CreateEnum
CREATE TYPE "amenities_type" AS ENUM ('locker', 'parking spot', 'other');

-- CreateEnum
CREATE TYPE "employee_role" AS ENUM ('manager', 'daily operations', 'finance', 'other');

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('declarations', 'annual budgets', 'board meeting minutes', 'other');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "registration_type" AS ENUM ('renter', 'owner');

-- CreateTable
CREATE TABLE "amenities" (
    "id" SERIAL NOT NULL,
    "text_id" TEXT NOT NULL,
    "property_id" INTEGER,
    "description" TEXT NOT NULL,
    "fee" DECIMAL(5,2) NOT NULL,
    "type" "amenities_type" NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "belongs_to" (
    "property_id" INTEGER NOT NULL,
    "common_facility_id" INTEGER NOT NULL,

    CONSTRAINT "belongs_to_pkey" PRIMARY KEY ("property_id","common_facility_id")
);

-- CreateTable
CREATE TABLE "common_facilities" (
    "id" SERIAL NOT NULL,
    "facility_name" TEXT NOT NULL,

    CONSTRAINT "common_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condo_management_files" (
    "file_key" TEXT NOT NULL,
    "file_type" "file_type" DEFAULT 'other',
    "company_id" INTEGER,
    "description" TEXT,

    CONSTRAINT "condo_management_files_pkey" PRIMARY KEY ("file_key")
);

-- CreateTable
CREATE TABLE "employed_by" (
    "public_user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "yearly_salary" DECIMAL(10,2) NOT NULL,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),
    "role" "employee_role" NOT NULL,

    CONSTRAINT "employed_by_pkey" PRIMARY KEY ("public_user_id","company_id")
);

-- CreateTable
CREATE TABLE "holder_of" (
    "public_user_id" INTEGER NOT NULL,
    "amenities_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),

    CONSTRAINT "holder_of_pkey" PRIMARY KEY ("public_user_id","amenities_id")
);

-- CreateTable
CREATE TABLE "management_companies" (
    "id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "unit_count" INTEGER DEFAULT 0,
    "parking_count" INTEGER DEFAULT 0,
    "locker_count" INTEGER DEFAULT 0,

    CONSTRAINT "management_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owned_by" (
    "owner_id" INTEGER NOT NULL,
    "property_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),

    CONSTRAINT "owned_by_pkey" PRIMARY KEY ("owner_id","property_id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "condo_fee" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_users" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "profile_image_key" TEXT,

    CONSTRAINT "public_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_key" (
    "key_text" TEXT NOT NULL,
    "type" "registration_type" NOT NULL,
    "issued_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "company_id" INTEGER,
    "public_user_id" INTEGER,
    "property_id" INTEGER,

    CONSTRAINT "registration_key_pkey" PRIMARY KEY ("key_text")
);

-- CreateTable
CREATE TABLE "requests" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "request_priority" "priority" DEFAULT 'low',
    "issued_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complete_by" TIMESTAMP(6),
    "condo_owner_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("condo_owner_id","employee_id","title","issued_at")
);

-- CreateTable
CREATE TABLE "reserved_by" (
    "public_user_id" INTEGER NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "reserved_by_pkey" PRIMARY KEY ("public_user_id","facility_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashed_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "amenities_id_property_id_key" ON "amenities"("id", "property_id");

-- CreateIndex
CREATE UNIQUE INDEX "management_companies_company_name_address_key" ON "management_companies"("company_name", "address");

-- CreateIndex
CREATE UNIQUE INDEX "property_address_unit_id_key" ON "property"("address", "unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "public_users_username_key" ON "public_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "amenities" ADD CONSTRAINT "amenities_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "belongs_to" ADD CONSTRAINT "belongs_to_common_facility_id_fkey" FOREIGN KEY ("common_facility_id") REFERENCES "common_facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "belongs_to" ADD CONSTRAINT "belongs_to_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "condo_management_files" ADD CONSTRAINT "condo_management_files_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employed_by" ADD CONSTRAINT "employed_by_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employed_by" ADD CONSTRAINT "employed_by_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "holder_of" ADD CONSTRAINT "holder_of_amenities_id_fkey" FOREIGN KEY ("amenities_id") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "holder_of" ADD CONSTRAINT "holder_of_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "management_companies" ADD CONSTRAINT "management_companies_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owned_by" ADD CONSTRAINT "owned_by_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owned_by" ADD CONSTRAINT "owned_by_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public_users" ADD CONSTRAINT "public_users_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration_key" ADD CONSTRAINT "registration_key_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "management_companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration_key" ADD CONSTRAINT "registration_key_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registration_key" ADD CONSTRAINT "registration_key_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_condo_owner_id_fkey" FOREIGN KEY ("condo_owner_id") REFERENCES "public_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_by" ADD CONSTRAINT "reserved_by_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "common_facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserved_by" ADD CONSTRAINT "reserved_by_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

