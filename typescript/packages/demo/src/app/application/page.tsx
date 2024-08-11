"use client";
import {
  ArrowRight,
  Clock,
  FileIcon,
  Headset,
  MessageSquare,
  Upload,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import { VortyxHeader } from "../vortyx-header";

const KEYWORDS = {
  commercial_registration: ["cr", "registration", "license", "commercial"],
  financial_statements: [
    "financial",
    "statement",
    "balance",
    "income",
    "money",
  ],
  bank_statements: ["bank", "statement"],
  tax_returns: ["tax", "return"],
};

export default function BusinessLoanForm() {
  const [files, setFiles] = useState<Record<string, File>>({});
  const [fileStatus, setFileStatus] = useState<Record<string, string>>({});

  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFileName = (fileName: string, fileType: string) => {
    const lowerFileName = fileName.toLocaleLowerCase();
    const toMatch = KEYWORDS[fileType as keyof typeof KEYWORDS];

    return toMatch.some((keyword) => lowerFileName.includes(keyword));
  };

  const handleFileUpload = (fileKey: string, file: File) => {
    setFiles((prev) => ({ ...prev, [fileKey]: file }));
    setFileStatus((prev) => ({ ...prev, [fileKey]: "Analyzing" }));

    // Simulate file analysis
    setTimeout(() => {
      if (validateFileName(file.name, fileKey)) {
        setFileStatus((prev) => ({ ...prev, [fileKey]: "Valid" }));
      } else {
        setFileStatus((prev) => ({ ...prev, [fileKey]: "Incomplete" }));
        toast({
          title: "Invalid File",
          description:
            "The uploaded file does not contain the necessary information.",
        });
      }
    }, 1500); // 1.5 seconds delay
  };

  return (
    <div className="flex h-full max-h-full flex-col overflow-auto">
      <VortyxHeader />
      <Separator className="mb-4" />
      <div className="flex h-full max-h-full flex-col items-center justify-center overflow-auto">
        <Card className="mx-auto flex h-auto max-h-full max-w-4xl flex-col overflow-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Business Loan Application
            </CardTitle>
          </CardHeader>
          <CardContent className="flex max-h-full flex-col overflow-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Vortyx AI Technologies"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="registrationNumber">
                    Commercial Registration Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Ahmed Almadan"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position in Company</Label>
                  <Input
                    id="position"
                    placeholder="Chief Financial Officer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="finance@vortyx.ai"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Business Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="011xxxxxxx"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="loanAmount">
                    Requested Loan Amount (SAR)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="5000000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="annualRevenue">Annual Revenue (SAR)</Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    placeholder="10000000"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expansion">
                        Business Expansion
                      </SelectItem>
                      <SelectItem value="equipment">
                        Equipment Purchase
                      </SelectItem>
                      <SelectItem value="working_capital">
                        Working Capital
                      </SelectItem>
                      <SelectItem value="refinancing">
                        Debt Refinancing
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Required Documents</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    "Commercial Registration",
                    "Financial Statements",
                    "Bank Statements",
                    "Tax Returns",
                  ].map((doc) => {
                    const fileKey = doc.toLowerCase().replace(" ", "_");
                    const file = files[fileKey];
                    const status = fileStatus[fileKey];

                    return (
                      <div key={doc} className="w-96 rounded-lg border p-4">
                        <p className="mb-2 font-medium">{doc}</p>
                        {file ? (
                          <div className="group relative flex items-center justify-between rounded-md bg-blue-50 p-3">
                            <div className="flex w-full items-center">
                              <FileIcon
                                size={20}
                                className="mr-2 shrink-0 text-blue-500"
                              />
                              <div className="min-w-0 grow">
                                <p className="max-w-[275px] truncate text-sm font-medium text-blue-700">
                                  {file.name}
                                </p>
                                <p className="text-xs text-blue-500">
                                  {formatFileSize(file.size)}
                                </p>
                                <p
                                  className={`text-xs ${status === "Valid" ? "text-green-500" : status === "Invalid" ? "text-red-500" : "text-yellow-500"}`}
                                >
                                  {status || "Uploading"}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => {
                                setFiles((prev) => {
                                  const newFiles = { ...prev };
                                  delete newFiles[fileKey];
                                  return newFiles;
                                });
                                setFileStatus((prev) => {
                                  const newStatus = { ...prev };
                                  delete newStatus[fileKey];
                                  return newStatus;
                                });
                              }}
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 shrink-0 -translate-y-1/2 text-red-500 opacity-0 transition-opacity hover:text-red-700 group-hover:opacity-100"
                            >
                              <X size={20} />
                            </Button>
                          </div>
                        ) : (
                          <label className="flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-blue-500">
                            <Input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const files = e.target.files;
                                const file = files?.[0];
                                if (!file) return;
                                handleFileUpload(fileKey, file);
                              }}
                            />
                            <div className="flex flex-col items-center text-gray-500 hover:text-blue-500">
                              <Upload size={24} className="mb-2" />
                              <span className="text-sm">Click to upload</span>
                            </div>
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
            <Button type="submit" className="mt-4 w-full" asChild>
              <Link href="/application/submitted">
                <span className="grow text-center">Submit Application</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 right-8 rounded-full p-4 shadow-lg">
            <Headset className="mr-2 size-5" />
            <span>Support</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Support Options</DialogTitle>
            <DialogDescription>
              Choose how you would like to receive support
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <MessageSquare className="size-5" />
                <div>
                  <CardTitle className="text-lg">AI Agent</CardTitle>
                  <CardDescription>Instant support</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Chat Now</Button>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <User className="size-5" />
                <div>
                  <CardTitle className="text-lg">Human Agent</CardTitle>
                  <CardDescription>15 minutes wait time</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Request Chat</Button>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <Clock className="size-5" />
                <div>
                  <CardTitle className="text-lg">Priority Support</CardTitle>
                  <CardDescription>5 minutes wait time</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Request Priority</Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
