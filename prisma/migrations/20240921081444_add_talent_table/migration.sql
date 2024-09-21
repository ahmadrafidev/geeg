-- CreateTable
CREATE TABLE "Talent" (
    "address" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT[],
    "timezone" TEXT NOT NULL,
    "hourlyRate" INTEGER NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Talent_address_key" ON "Talent"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_username_key" ON "Talent"("username");
