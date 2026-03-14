/*
  Warnings:

  - A unique constraint covering the columns `[userId,platform,accountId]` on the table `SocialIntegration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocialIntegration_userId_platform_accountId_key" ON "SocialIntegration"("userId", "platform", "accountId");
