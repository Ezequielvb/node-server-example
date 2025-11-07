-- CreateTable
CREATE TABLE "planes" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activities" JSONB,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "planes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planes" ADD CONSTRAINT "planes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
