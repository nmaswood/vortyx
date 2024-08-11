import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { Customer } from "@/app/customer-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const cashFlowPrediction = {
  nextMonthIncome: Math.round(Math.random() * 50000 + 100000),
  nextMonthExpenses: Math.round(Math.random() * 30000 + 70000),
};

export const TransactionTab: React.FC<{ customer: Customer }> = ({
  customer,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <Wallet className="mr-2 size-6 " />
          Recent Transactions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-semibold">
              <TrendingUp className="mr-2 size-5 text-blue-500" />
              Next Month Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center space-x-4 rounded-lg border border-green-100 bg-green-50 p-4">
                <div className="rounded-full bg-green-100 p-2">
                  <ArrowUpCircle className="size-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-green-600">
                    Projected Income
                  </p>
                  <p className="mt-1 text-xl font-semibold text-green-700">
                    {FORMATTER.format(cashFlowPrediction.nextMonthIncome)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-lg border border-red-100 bg-red-50 p-4">
                <div className="rounded-full bg-red-100 p-2">
                  <ArrowDownCircle className="size-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-red-600">
                    Projected Expenses
                  </p>
                  <p className="mt-1 text-xl font-semibold text-red-700">
                    {FORMATTER.format(cashFlowPrediction.nextMonthExpenses)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AI Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.transactions.map((t) => (
                <TableRow
                  key={t.description}
                  className="transition-colors hover:bg-gray-50"
                >
                  <TableCell className="text-sm text-gray-600">
                    {DATE_FORMATTER.format(t.date)}
                  </TableCell>
                  <TableCell className="font-medium">{t.description}</TableCell>
                  <TableCell className="font-semibold">
                    {FORMATTER.format(t.amount)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                        ${
                          t.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : t.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                    >
                      {t.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-blue-600">
                      {t.aiCategory}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "SAR",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
