"use client";
import { cx } from "class-variance-authority";
import { Download, Filter, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { CUSTOMERS, LoanStatus } from "../customer-data";

export default function CompanyDashboard() {
  const router = useRouter();

  const [input, setInput] = React.useState("");

  const strippedInput = input.trim().toLocaleLowerCase();

  return (
    <div className="min-h-screen w-full">
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Companies</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <NewCompanyModal />
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {CUSTOMERS.length} brokers
              </span>
              <Button variant="ghost" size="sm">
                <Download size={16} className="text-gray-400" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  className="pl-8"
                  placeholder="Search this table..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company name</TableHead>
                <TableHead>Broker name</TableHead>
                <TableHead>Deal status</TableHead>
                <TableHead>Last update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CUSTOMERS.filter(
                (c) => strippedInput === "" || c.lowerCaseName.includes(input),
              ).map(
                (
                  { id, status, lastUpdate, name, brokerName: email, disabled },
                  index,
                ) => (
                  <TableRow
                    key={index}
                    onClick={
                      disabled ? undefined : () => router.push(`/brokers/${id}`)
                    }
                    className={cn(!disabled && "cursor-pointer")}
                  >
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      <StatusBadge status={status} />
                    </TableCell>
                    <TableCell>{lastUpdate.toLocaleDateString()}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

const getStatusStyles = (status: LoanStatus) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-300";
    case "pending":
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }
};

const StatusBadge: React.FC<{ status: LoanStatus }> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(
        status,
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

function NewCompanyModal() {
  const [formData, setFormData] = React.useState({
    companyName: "",
    email: "",
    industry: "",
    annualRevenue: "",
    employeeCount: "",
    yearFounded: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // Here you would typically send this data to your backend
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 size-4" /> Add New Company
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            Enter the details of the new company you want to add to your
            portfolio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="industry" className="text-right">
                Industry
              </Label>
              <Select
                name="industry"
                value={formData.industry}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="annualRevenue" className="text-right">
                Annual Revenue
              </Label>
              <Input
                id="annualRevenue"
                name="annualRevenue"
                value={formData.annualRevenue}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="SAR"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeCount" className="text-right">
                Employees
              </Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleInputChange}
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="yearFounded" className="text-right">
                Year Founded
              </Label>
              <Input
                id="yearFounded"
                name="yearFounded"
                value={formData.yearFounded}
                onChange={handleInputChange}
                className="col-span-3"
                type="number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
