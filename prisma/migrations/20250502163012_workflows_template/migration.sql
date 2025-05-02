-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "discordTemplate" TEXT,
ADD COLUMN     "notionAccessToken" TEXT,
ADD COLUMN     "notionDbId" TEXT,
ADD COLUMN     "notionTemplate" TEXT,
ADD COLUMN     "slackAccessToken" TEXT,
ADD COLUMN     "slackChannels" TEXT[],
ADD COLUMN     "slackTemplate" TEXT;
