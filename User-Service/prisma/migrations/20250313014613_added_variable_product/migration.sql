/*
  Warnings:

  - Added the required column `measuredIn` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('GRAM', 'KILOGRAM', 'LITER', 'MILLILITER', 'UNIT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "measuredIn" "MeasurementUnit" NOT NULL;
