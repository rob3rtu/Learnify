-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_classId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_forumId_fkey";

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
