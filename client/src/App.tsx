import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [totalSpent] = useState(0);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you're spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
