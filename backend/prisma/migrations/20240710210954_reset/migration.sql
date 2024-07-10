-- CreateTable
CREATE TABLE "mailingList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "mailingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipient" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "mailingListId" INTEGER NOT NULL,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recentlySent" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mailingListId" INTEGER NOT NULL,

    CONSTRAINT "recentlySent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipient_email_key" ON "recipient"("email");

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_mailingListId_fkey" FOREIGN KEY ("mailingListId") REFERENCES "mailingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recentlySent" ADD CONSTRAINT "recentlySent_mailingListId_fkey" FOREIGN KEY ("mailingListId") REFERENCES "mailingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
