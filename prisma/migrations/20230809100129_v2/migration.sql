-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "css" TEXT,
ADD COLUMN     "js" TEXT,
ALTER COLUMN "html" DROP NOT NULL;
