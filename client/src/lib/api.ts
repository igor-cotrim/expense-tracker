import { hc } from "hono/client";

import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

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

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
