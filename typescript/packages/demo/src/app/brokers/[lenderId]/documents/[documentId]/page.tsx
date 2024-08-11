"use client";

import {
  Activity,
  ArrowDownRight,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  List,
  Loader2,
  PieChart,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CUSTOMERS, Question } from "@/app/customer-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PageProps = {
  params: {
    lenderId: string;
    documentId: string;
  };
};

export default function CustomerDetailPage({
  params: { lenderId, documentId },
}: PageProps) {
  const data = useMemo(() => {
    return CUSTOMERS.find((customer) => customer.id === lenderId);
  }, [lenderId]);

  if (!data) {
    return <div>Customer not found</div>;
  }

  const doc = data.documents.find((doc) => doc.id === documentId);
  if (!doc) {
    return <div>Document not found</div>;
  }

  const chartData = [
    { month: "Jan", balance: 2610.75 },
    { month: "Feb", balance: 2300 },
    { month: "Mar", balance: 1900 },
    { month: "Apr", balance: 1600 },
    { month: "May", balance: 1200 },
    { month: "Jun", balance: 236.07 },
  ];

  return (
    <div className="flex size-full max-h-full min-h-screen flex-col overflow-auto p-8">
      <div className="mb-6 flex items-center justify-between">
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
              <BreadcrumbLink href={`/brokers/${data.id}`}>
                {data.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{doc.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex size-full max-h-full space-x-4 overflow-auto">
        <object
          data={doc.signedUrl}
          type="application/pdf"
          className="h-full w-1/2"
        />
        <div className="flex h-full max-h-full w-1/2 flex-col gap-3 overflow-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Financial Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current Balance</p>
                      <h3 className="text-2xl font-bold">$236.07</h3>
                    </div>
                    <Badge variant={"destructive"}>
                      <ArrowDownRight className="mr-1 size-3" /> 90.96%
                    </Badge>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 text-sm font-medium">Monthly Spending</p>
                    <Progress value={67} className="h-2" />
                    <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                      <span>$1,634 spent</span>
                      <span>$2,500 budget</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Largest Transaction</p>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 size-4 text-muted-foreground" />
                        <span className="font-semibold">$523.48</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Transaction Count</p>
                      <div className="flex items-center">
                        <Activity className="mr-2 size-4 text-muted-foreground" />
                        <span className="font-semibold">47</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Statement Period</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 size-4 text-muted-foreground" />
                        <span className="font-semibold">Jun 1 - Jun 30</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Account Type</p>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 size-4 text-muted-foreground" />
                        <span className="font-semibold">Checking</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Balance Trend</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analysis" className="grid grid-cols-1 gap-6">
              <AIClassification />
              <DocumentSummary />
              <MultilingualSupport />
            </TabsContent>
            <TabsContent value="recommendations">
              <DocumentRecommendations />
            </TabsContent>
            <TabsContent value="chat">
              <ChatInterface questions={doc.questions} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
//<MultilingualSupport />

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatInterface: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant for document analysis. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      const matchedQuestion = questions.find(
        (q) => q.question.toLowerCase() === input.toLowerCase(),
      );
      if (matchedQuestion) {
        setMessages((prev) => [
          ...prev,
          { text: matchedQuestion.answer, sender: "bot" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm sorry, I don't have specific information about that. Could you please ask something related to the document?",
            sender: "bot",
          },
        ]);
      }
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Chat</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`flex items-end ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar
                className={`size-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}
              >
                <AvatarImage
                  src={
                    message.sender === "user"
                      ? "/user-avatar.png"
                      : "/ai-avatar.png"
                  }
                />
                <AvatarFallback>
                  {message.sender === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-md rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t p-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {questions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(question.question);
                  handleSend();
                }}
                className="text-xs"
              >
                {question.question}
              </Button>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyPress}
              className="flex-1"
              placeholder="Ask about the document..."
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AIClassification = () => {
  const [classification, setClassification] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateAIClassification = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setClassification("Financial Statement");
      setConfidence(92);
      setLoading(false);
    };
    simulateAIClassification();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 size-5" />
          AI Document Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 size-6 animate-spin text-blue-500" />
            <span className="text-lg font-medium">Analyzing document...</span>
          </div>
        ) : (
          <div className="animate-fade-in-down">
            <div className="mb-4 text-2xl font-bold text-gray-800">
              {classification}
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Confidence
              </span>
              <Badge variant="secondary">{confidence}%</Badge>
            </div>
            <Progress value={confidence} className="h-2 w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DocumentSummary = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateAISummary = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setSummary(
        "This financial statement shows a company with stable revenue growth of 5% year-over-year, but decreasing profit margins. The balance sheet indicates a healthy cash position but increasing long-term debt.",
      );
      setLoading(false);
    };
    simulateAISummary();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <PieChart className="mr-2 size-5" />
          Intelligent Document Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 size-6 animate-spin text-green-500" />
            <span className="text-lg font-medium">Generating summary...</span>
          </div>
        ) : (
          <p className="animate-fade-in leading-relaxed text-gray-700">
            {summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const MultilingualSupport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          Multilingual Support
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="animate-fade-in-up">
          <p className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-gray-700">
            Document is already in English. No translation needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentRecommendations = () => {
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateRecommendations = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2200));
      setRecommendations([
        "Latest Tax Return",
        "Bank Statements (Last 3 months)",
        "Business License",
      ]);
      setLoading(false);
    };
    simulateRecommendations();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <List className="mr-2 size-5" />
          Smart Document Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 size-6 animate-spin text-pink-500" />
            <span className="text-lg font-medium">
              Generating recommendations...
            </span>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <p className="mb-4 text-gray-700">
              Based on this document, we recommend requesting:
            </p>
            <ul className="space-y-2">
              {recommendations?.map((rec, index) => (
                <li
                  key={index}
                  className="flex animate-fade-in-left items-center rounded-lg border border-pink-200 bg-pink-50 p-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Badge variant="secondary" className="mr-2">
                    {index + 1}
                  </Badge>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
