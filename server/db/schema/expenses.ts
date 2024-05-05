import {
  date,
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("user_idx").on(expenses.userId),
    };
  }
);

// Schema for inserting a expenses - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: "Title must be at leats 3 characters" }),
  amount: z.string().regex(/^[0-9]+(\.[0-9]{2})?$/, {
    message: "Amount must be a monetary value",
  }),
});
// Schema for selecting a Expense - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
