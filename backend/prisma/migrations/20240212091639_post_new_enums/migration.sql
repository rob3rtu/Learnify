/*
  Warnings:

  - Added the required column `resourceType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classSection` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "enum_Resource_type" AS ENUM ('link', 'document');

-- CreateEnum
CREATE TYPE "enum_Class_section" AS ENUM ('materials', 'courses', 'seminars', 'laboratory');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "resourceType",
ADD COLUMN     "resourceType" "enum_Resource_type" NOT NULL,
DROP COLUMN "classSection",
ADD COLUMN     "classSection" "enum_Class_section" NOT NULL;
