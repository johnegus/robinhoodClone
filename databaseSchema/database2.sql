CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "cashValue" int,
  "investmentsValue" int,
  "hashedPassword" varchar
);

CREATE TABLE "Stocks" (
  "id" SERIAL PRIMARY KEY,
  "symbol" varchar,
  "company" varchar,
  "currentPrice" int,
  "buyPrice" int,
  "shares" int,
  "userId" int,
  "created_at" timestamp
);

ALTER TABLE "Stocks" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");
