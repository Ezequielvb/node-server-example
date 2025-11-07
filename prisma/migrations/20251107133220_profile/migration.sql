-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "useremail" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_useremail_key" ON "Profile"("useremail");
