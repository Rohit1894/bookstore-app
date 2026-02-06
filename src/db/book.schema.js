import { pgTable, uuid, varchar, text ,index} from "drizzle-orm/pg-core";
import { authorsTable } from "./author.schema.js";
import { sql } from "drizzle-orm";

export const booksTable = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  authorId: uuid("author_id")
    .notNull()
    .references(() => authorsTable.id),
},
  (table) => ({
    titleSearchIndex: index("books_title_search_idx").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`
    ),
  })


);
