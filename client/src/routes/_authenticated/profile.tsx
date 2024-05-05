import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { data, isPending, error } = useQuery(userQueryOptions);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-2">
      <p>Hello, {data.user.given_name}</p>
      <a href="/api/logout">Logout!</a>
    </div>
  );
}
