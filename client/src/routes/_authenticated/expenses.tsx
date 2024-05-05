import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
  const result = await api.expenses.$get();
  if (!result.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await result.json();

  return data;
}

function Expenses() {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-full max-w-3xl p-2 m-auto">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
