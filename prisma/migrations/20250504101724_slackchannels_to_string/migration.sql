-- AlterTable
ALTER TABLE "Workflow" ALTER COLUMN "slackChannels" DROP NOT NULL,
ALTER COLUMN "slackChannels" SET DATA TYPE TEXT;
