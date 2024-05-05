import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

import { type ApiRoutes } from "@server/app";
import { CreateExpense } from "@server/shared/types";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const result = await api.me.$get();
  if (!result.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await result.json();

  return data;
}

export async function getAllExpenses() {
  const result = await api.expenses.$get();
  if (!result.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await result.json();

  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5, // 5 minutes,
});

export async function createExpense({ value }: { value: CreateExpense }) {
  const result = await api.expenses.$post({ json: value });
  if (!result.ok) {
    throw new Error("Failed to create expense");
  }

  const newExpense = await result.json();

  return newExpense;
}

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
  const result = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });
  if (!result.ok) {
    throw new Error("Failed to delete expense");
  }
}
