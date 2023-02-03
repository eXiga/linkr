-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "link" VARCHAR(1000) NOT NULL,
    "urgency" INTEGER NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);
