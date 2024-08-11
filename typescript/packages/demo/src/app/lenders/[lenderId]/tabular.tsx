import { Pencil } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Tabular() {
  return (
    <>
      <Card className="mb-4 flex flex-col gap-4">
        <DisplayTitle title="Profit & Loss" />

        <CardContent className="flex flex-col gap-4 overflow-auto">
          <DataTable header="Profit & Loss" rows={pAndL.rows} />
          <DataTable header="COGS" rows={COGS.rows} />
          <DataTable header="SG&A" rows={SGA.rows} />
        </CardContent>
      </Card>

      <Card className="mb-4 flex flex-col gap-4">
        <DisplayTitle title="Cashflow Statement" />

        <CardContent className="flex flex-col gap-4 overflow-auto">
          <DataTable header="Cashflow" rows={NIMRA.rows} />
        </CardContent>
      </Card>

      <Card className="flex flex-col gap-4">
        <DisplayTitle title="Balance sheet" />
        <CardContent className="flex flex-col gap-4 overflow-auto">
          <DataTable header="Balance Sheet" rows={BAZ.rows} />
        </CardContent>
      </Card>
    </>
  );
}

const pAndL: DataTableProps = {
  header: "2021,2022,2023",
  rows: [
    {
      title: "Product Sales",
      values: ["7,380,314", "12,301,583", "20,553,755"],
    },
    {
      title: "Sales Discounts",
      values: ["183,659", "364,181", "495,417"],
    },
    { title: "Commission income", values: ["-", "4,351", "378,884"] },
    {
      title: "Shipping and Delivery Income",
      values: ["48,776", "309,414", "466,871"],
    },
    { title: "Miscellaneous Income", values: ["392", "71,842", "71,759"] },
    {
      title: "Total revenue",
      values: ["7,245,822", "12,323,009", "20,975,853"],
    },
  ],
};

const COGS: DataTableProps = {
  header: "2021,2022,2023",
  rows: [
    {
      title: "Cost of Sales",
      values: ["4,575,378", "7,828,244", "11,941,649"],
    },
    { title: "Project Costs", values: ["681", "77", "523,897"] },
    { title: "Logistics", values: ["616,606", "74,236", "1,556,267"] },
    { title: "Payments", values: ["163,425", "422,263", "416,329"] },
    {
      title: "Total COGS",
      values: ["5,356,090", "8,324,819", "14,438,141"],
      highlight: true,
    },

    { title: "Gross profit", values: ["1,889,733", "3,998,189", "6,537,711"] },
  ],
};

const SGA: DataTableProps = {
  header: "2021,2022,2023",
  rows: [
    { title: "Payroll", values: ["793,516", "1,755,665", "2,195,163"] },
    {
      title: "Marketing and Promotion",
      values: ["1,442,540", "2,262,961", "2,356,532"],
    },
    { title: "Travel", values: ["87,385", "125,148", "201,775"] },
    {
      title: "Rent and Office Admin",
      values: ["242,390", "196,078", "229,137"],
    },
    { title: "Technology", values: ["93,684", "152,575", "131,895"] },
    { title: "Professional Services", values: ["24,195", "99,425", "46,061"] },
    {
      title: "Miscellaneous Expenses",
      values: ["97,499", "181,938", "325,114"],
    },
    {
      title: "Total Operating Expenses",
      values: ["2,781,209", "4,773,791", "5,485,677"],
    },
    {
      title: "Net Income",
      values: ["(891,476)", "(775,602)", "1,052,034"],
    },
  ],
};

const NIMRA: DataTableProps = {
  header: "Cash Flow Details",
  rows: [
    {
      title: "Net income",
      values: ["(891,476)", "(775,602)", "1,052,034"],
      highlight: true,
    },
    {
      title: "Depreciation",
      values: ["90,826", "154,798", "305,508"],
    },
    {
      title: "Provision for Employee benefits",
      values: ["(481)", "9,024", "26,051"],
    },
    {
      title: "Inventory",
      values: ["273,808", "(2,124,203)", "1,994,652"],
    },
    {
      title: "Account Receivables & Other debit balance",
      values: ["(61,958)", "(319,339)", "277,871"],
    },
    {
      title: "Trade payables",
      values: ["92,640", "864,026", "337,453"],
    },
    {
      title: "Other payables and credit balance",
      values: ["613,056", "4,493,202", "(876,095)"],
    },
    {
      title: "Total Cash from Operating Activities",
      values: ["116,414", "2,301,906", "3,117,474"],
      highlight: true,
    },
    {
      title: "Acquisition for PPE",
      values: ["(486,565)", "(899,696)", "(1,037,121)"],
    },
    {
      title: "Total Cash from Investing Activities",
      values: ["(486,565)", "(899,696)", "(1,037,121)"],
      highlight: true,
    },
    {
      title: "Due to related parties",
      values: ["(8,871)", "(422,179)", "(1,163,717)"],
    },
    {
      title: "Loan",
      values: ["289,711", "140,708", "(359,552)"],
    },
    {
      title: "Share capital",
      values: ["(1,850)", "-", "-"],
    },
    {
      title: "Total Cash from Financing Activities",
      values: ["278,990", "(281,471)", "(1,523,268)"],
      highlight: true,
    },
    {
      title: "Net change in cash and cash equivalents",
      values: ["(91,161)", "1,120,739", "557,086"],
    },
    {
      title: "Beginning balance",
      values: ["288,306", "197,145", "1,317,885"],
    },
    {
      title: "End balance",
      values: ["197,145", "1,317,885", "1,874,970"],
    },
  ],
};

interface DataTableProps {
  header: string;
  rows: {
    title: string;
    values: string[];
    highlight?: boolean;
  }[];
}

const DataTable: React.FC<DataTableProps> = ({ header, rows }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            {header}
          </th>
          <th
            scope="col"
            className="w-1/4 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            2021
          </th>
          <th
            scope="col"
            className="w-1/4 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            2022
          </th>
          <th
            scope="col"
            className="w-1/4 px-6 py-3  text-right text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            2023
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map(({ title, values }, idx) => (
          <tr
            key={title}
            className={cn(idx === rows.length - 1 ? "bg-blue-50" : undefined)}
          >
            <td className="w-1/4 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
              {title}
            </td>
            {values.map((value, valueIndex) => (
              <td
                key={valueIndex}
                className="w-1/4 whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const BAZ: DataTableProps = {
  header: "Financial Data",
  rows: [
    {
      title: "Current assets",
      values: ["SAR 1,023,531", "4,587,813", "2,872,376"],
      highlight: true,
    },
    {
      title: "Cash and cash equivalent",
      values: ["SAR 197,145", "1,317,885", "1,874,970"],
    },
    {
      title: "Account Receivables & Other debit balance",
      values: ["SAR 104,312", "421,505", "72,786"],
    },
    {
      title: "Inventory stock",
      values: ["SAR 722,074", "2,846,277", "851,625"],
    },
    {
      title: "Prepaid expense",
      values: ["-", "2,145", "72,994"],
    },
    {
      title: "Noncurrent assets",
      values: ["SAR 931,560", "1,232,570", "1,964,182"],
      highlight: true,
    },
    {
      title: "Fixed assets",
      values: ["SAR 424,826", "786,708", "1,249,866"],
    },
    {
      title: "Intangible assets",
      values: ["SAR 609,927", "703,853", "1,277,816"],
    },
    {
      title: "Accumulated Depreciation",
      values: ["SAR (103,193)", "(257,991)", "(563,500)"],
    },
    {
      title: "Current liabilities",
      values: ["SAR 1,772,411", "5,559,242", "4,799,293"],
      highlight: true,
    },
    {
      title: "Trade payables",
      values: ["SAR 639,592", "1,503,617", "1,841,071"],
    },
    {
      title: "Due to related parties",
      values: ["SAR 256,228", "277,937", "(885,780)"],
    },
    {
      title: "Other payables and credit balance",
      values: ["SAR 767,372", "3,597,197", "3,773,135"],
    },
    {
      title: "Vehicle Loan",
      values: ["109,220", "180,491", "70,867"],
    },
    {
      title: "Noncurrent liabilities",
      values: ["SAR 182,679", "261,140", "37,264"],
      highlight: true,
    },
    {
      title: "Accrued EOS",
      values: ["SAR 2,188", "11,212", "37,264"],
    },
    {
      title: "Long Term Loan",
      values: ["180,491", "249,928", "-"],
    },
    {
      title: "Equity",
      values: ["SAR (887,776)", "(1,663,362)", "(611,328)"],
      highlight: true,
    },
    {
      title: "Share capital",
      values: ["SAR 3,700", "3,700", "3,700"],
    },
    {
      title: "Retained earnings",
      values: ["SAR (891,476)", "(1,667,062)", "(615,028)"],
    },
  ],
};

const DisplayTitle: React.FC<{ title: string }> = ({ title }) => (
  <CardHeader
    className="flex flex-row items-center justify-between"
    style={{
      padding: "1rem",
    }}
  >
    <CardTitle className="text-xl">{title}</CardTitle>
    <Button variant="secondary">
      <Pencil className="mr-2 size-4" />
      Edit content
    </Button>
  </CardHeader>
);
