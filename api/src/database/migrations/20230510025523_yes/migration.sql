-- CreateTable
CREATE TABLE "tb_companies" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_companies_email_key" ON "tb_companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_companies_username_key" ON "tb_companies"("username");
