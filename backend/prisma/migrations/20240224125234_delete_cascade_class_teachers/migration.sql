-- DropForeignKey
ALTER TABLE "ClassTeachers" DROP CONSTRAINT "ClassTeachers_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeachers" DROP CONSTRAINT "ClassTeachers_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "ClassTeachers" ADD CONSTRAINT "ClassTeachers_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ClassTeachers" ADD CONSTRAINT "ClassTeachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
