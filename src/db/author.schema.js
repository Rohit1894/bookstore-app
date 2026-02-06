import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const authorsTable = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 55 }).notNull(),
  lastName: varchar("last_name", { length: 55 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
