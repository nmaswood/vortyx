"use client";

import {
  AlertTriangle,
  Award,
  DollarSign,
  FileIcon,
  FileUp,
  Filter,
  Mail,
  PenSquare,
  Phone,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Bar, BarChart, Cell, Pie, PieChart } from "recharts";

import { Customer, CUSTOMERS } from "@/app/customer-data";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ChatTab } from "./chat-tab";
import { KYBTab } from "./kyb";
import Tabular from "./tabular";

type PageProps = {
  params: {
    lenderId: string;
  };
};

type SentimentAnalysis = {
  score: number;
  recentNews: Array<{
    title: string;
    sentiment: "Positive" | "Negative" | "Neutral";
  }>;
};

export default function CustomerDetailPage(props: PageProps) {
  const lenderId = props.params.lenderId;

  const router = useRouter();
  const data = React.useMemo(() => {
    return CUSTOMERS.find((customer) => customer.id === lenderId);
  }, [lenderId]);

  const [viewMode, setViewMode] = useState<"charts" | "table">("charts");

  if (!data) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="max-h flex size-full min-h-screen flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/brokers">Companies</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <EditCustomerDialog customer={data} />
      </div>

      <Tabs
        defaultValue="kyb"
        className="flex size-full  max-h-full flex-col overflow-auto"
      >
        <TabsList className="w-fit">
          <TabsTrigger value="kyb">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center text-sm font-medium text-gray-600">
                  <Filter size={18} className="mr-2" />
                  Sort by:
                  <span className="ml-2 text-gray-900">Type</span>
                </div>
                <div className="flex space-x-3">
                  <RequestDialog />

                  <UploadDialog />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.documents.map((doc) => {
                    return (
                      <TableRow
                        key={doc.name}
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(
                            `/brokers/${data.id}/documents/${doc.id}`,
                          );
                        }}
                      >
                        <TableCell>{doc.description}</TableCell>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.size}kb</TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full px-2 py-1 text-xs capitalize ${doc.status === "pending" ? "bg-yellow-100 text-yellow-800" : doc.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {doc.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost">...</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyb">
          <KYBTab />
        </TabsContent>
        <TabsContent value="analysis">
          <CreditAnalysisTab />
        </TabsContent>
        <TabsContent value="chat">
          <ChatTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RequestDialog() {
  const [contactMethod, setContactMethod] = React.useState("email");
  const [requestType, setRequestType] = React.useState(
    "Commercial Registration",
  );
  const [otherDocumentType, setOtherDocumentType] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center" size="sm">
          <FileUp size={18} className="mr-2" />
          Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Request Document
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Contact Method</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={setContactMethod}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label
                  htmlFor="email"
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <Mail size={18} />
                  <span>Email</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label
                  htmlFor="phone"
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <Phone size={18} />
                  <span>AI Phone Call</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-4">
            <Label htmlFor="request-type" className="text-lg font-semibold">
              Request Type
            </Label>
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger id="request-type" className="w-full">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commercial Registration">
                  Commercial Registration
                </SelectItem>
                <SelectItem value="Financial Statements">
                  Financial Statements
                </SelectItem>
                <SelectItem value="Bank Statements">Bank Statements</SelectItem>
                <SelectItem value="Tax Returns">Tax Returns</SelectItem>
                <SelectItem value="Other">Other (General Question)</SelectItem>
              </SelectContent>
            </Select>
            {requestType === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="other-document" className="text-sm font-medium">
                  Specify Document
                </Label>
                <Input
                  id="other-document"
                  placeholder="Enter document type"
                  value={otherDocumentType}
                  onChange={(e) => setOtherDocumentType(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg font-semibold">
              Additional Message (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Enter any additional details or questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Send Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UploadDialog() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Here you would implement the logic to upload the file
    console.log("Uploading file:", file);
    console.log("Document type:", documentType);
    console.log("Notes:", notes);
    // Reset form after submission
    setDocumentType("");
    setFile(null);
    setNotes("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center" size="sm">
          <Upload size={18} className="mr-2" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upload Document
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="document-type" className="text-lg font-semibold">
              Document Type
            </Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger id="document-type" className="w-full">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commercial Registration">
                  Commercial Registration
                </SelectItem>
                <SelectItem value="Financial Statements">
                  Financial Statements
                </SelectItem>
                <SelectItem value="Bank Statements">Bank Statements</SelectItem>
                <SelectItem value="Tax Returns">Tax Returns</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label htmlFor="file-upload" className="text-lg font-semibold">
              Upload File
            </Label>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
              className="w-full"
            />
            {file && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileIcon size={16} />
                <span>{file.name}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-lg font-semibold">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full">
            Upload Document
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const EditCustomerDialog = ({ customer }: { customer: Customer }) => {
  const [editedCustomer, setEditedCustomer] = useState({
    name: customer.name,
    email: customer.brokerName,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PenSquare size={16} className="mr-2" />
          Edit Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Customer
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="name" className="text-lg font-semibold">
              Company Name
            </Label>
            <Input
              id="name"
              name="name"
              value={editedCustomer.name}
              onChange={(e) => {
                const { name, value } = e.target;
                setEditedCustomer((prev) => ({ ...prev, [name]: value }));
              }}
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="email" className="text-lg font-semibold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={editedCustomer.email}
              onChange={(e) => {
                const { name, value } = e.target;
                setEditedCustomer((prev) => ({ ...prev, [name]: value }));
              }}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

function CreditAnalysisTab(): React.ReactElement {
  const state = {
    benchmarks: [
      { metric: "Revenue Growth", companyValue: 18.5, industryAverage: 12.8 },
      { metric: "Profit Margin", companyValue: 11.2, industryAverage: 10.2 },
      //{
      //metric: "Debt-to-Equity Ratio",
      //companyValue: 1.2,
      //industryAverage: 1.5,
      //},
      {
        metric: "Working Capital Ratio",
        companyValue: 2.1,
        industryAverage: 1.8,
      },
    ],
    sentiment: {
      score: 0.72,
      recentNews: [
        { title: "Company X Secures Major Contract", sentiment: "Positive" },
        { title: "Industry Outlook Remains Strong", sentiment: "Positive" },
        { title: "Company X Reports Q2 Earnings Beat", sentiment: "Positive" },
        { title: "New Regulations May Impact Sector", sentiment: "Neutral" },
      ],
    },
    creditLimit: {
      suggestedLimit: 750000,
      confidence: 0.92,
      factors: [
        "Strong cash flow position",
        "Consistent revenue growth",
        "Low debt-to-equity ratio",
        "Positive industry outlook",
      ],
    },
    creditScore: {
      score: 785,
      confidence: 0.95,
      factors: [
        "Excellent payment history",
        "Low credit utilization",
        "Long-standing credit accounts",
        "Diverse credit mix",
      ],
    },
  };

  return (
    <div className="flex h-full max-h-full flex-col space-y-6 overflow-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <IndustryBenchmarking benchmarks={state.benchmarks} />
        <SentimentAnalysis sentiment={state.sentiment} />
        <CreditLimitOptimization creditLimit={state.creditLimit} />
        <AIDrivenCreditScore creditScore={state.creditScore} />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IndustryBenchmarking({ benchmarks }: { benchmarks: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-medium">
          <TrendingUp className="mr-2 size-5" />
          Industry Benchmarking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={benchmarks}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="companyValue" fill="#4f46e5" name="Company" />
            <Bar dataKey="industryAverage" fill="#9ca3af" name="Industry Avg" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SentimentAnalysis({ sentiment }: any) {
  const sentimentData = [
    { name: "Positive", value: sentiment.score },
    { name: "Negative", value: 1 - sentiment.score },
  ];
  const COLORS = ["#4f46e5", "#e5e7eb"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-medium">
          <Award className="mr-2 size-5" />
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="relative w-2/5">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-bold">
                {(sentiment.score * 100).toFixed(0)}%
              </p>
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <p className="text-lg font-semibold">Positive Sentiment</p>
            <p className="text-sm text-gray-600">Recent News:</p>
            <div className="space-y-1">
              {sentiment.recentNews.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (news: any, index: any) => (
                  <div key={index} className="flex items-center text-sm">
                    <span
                      className={`mr-2 size-2 rounded-full ${news.sentiment === "Positive" ? "bg-green-500" : "bg-yellow-500"}`}
                    ></span>
                    {news.title}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AIDrivenCreditScore({ creditScore }: any) {
  const scoreData = [
    { name: "Score", value: creditScore.score },
    { name: "Remaining", value: 850 - creditScore.score },
  ];
  const COLORS = ["#4f46e5", "#e5e7eb"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-medium">
          <AlertTriangle className="mr-2 size-5" />
          AI-Driven Credit Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="relative w-2/5">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">{creditScore.score}</p>
              <p className="text-sm text-gray-600">Credit Score</p>
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <p className="text-lg font-semibold">Key Factors:</p>
            <Badge variant="outline">
              Confidence: {(creditScore.confidence * 100).toFixed(1)}%
            </Badge>
            <div className="space-y-1 text-sm">
              {creditScore.factors.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (factor: any, index: any) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 size-1.5 rounded-full bg-blue-500"></span>
                    {factor}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreditLimitOptimization({ creditLimit }: any) {
  const FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-medium">
          <DollarSign className="mr-2 size-5" />
          Credit Limit Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              {FORMATTER.format(creditLimit.suggestedLimit)}
            </span>
            <Badge variant="outline">
              Confidence: {(creditLimit.confidence * 100).toFixed(1)}%
            </Badge>
          </div>
          <Progress
            value={creditLimit.confidence * 100}
            className="h-2 w-full"
          />
          <div className="space-y-2">
            <p className="font-medium">Key Factors:</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              {creditLimit.factors.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (factor: any, index: any) => (
                  <li key={index}>{factor}</li>
                ),
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
