import { Bot, Loader2, RefreshCcw, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const hardcodedQA = [
  {
    question: "What was Kumo Beauty's annual revenue in 2023?",
    answer: "Kumo Beauty's annual revenue in 2023 was $759,000.",
  },
  {
    question: "What is Kumo Beauty's closing balance for Q2 2024?",
    answer:
      "I apologize, but I don't have specific information about Kumo Beauty's closing balance for Q2 2024. The financial statements provided are for the year 2023.",
  },
  {
    question: "What is Kumo Beauty's main business activity?",
    answer:
      "Kumo Beauty's main business activity is selling Korean beauty and health care products for women.",
  },
];

interface Message {
  type: "user" | "bot";
  content: string;
}

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        content:
          "Hello! I'm the Vortyx AI Assistant. How can I help you today?",
      },
    ]);
    setSuggestedQuestions(hardcodedQA.map((qa) => qa.question));
  }, []);

  const handleSend = (text: string) => {
    if (text.trim()) {
      setMessages((prev) => [...prev, { type: "user", content: text }]);
      setInput("");
      setIsTyping(true);
      setSuggestedQuestions([]);

      setTimeout(() => {
        const matchedQA = hardcodedQA.find((qa) =>
          qa.question.toLowerCase().includes(text.toLowerCase()),
        );
        const botResponse = matchedQA
          ? matchedQA.answer
          : "I'm sorry, I don't have enough context to answer that question. Is there anything else I can help you with regarding Kumo Beauty's financial information or business activities?";

        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", content: botResponse },
        ]);
        setIsTyping(false);

        const newSuggestions = hardcodedQA
          .filter((qa) => qa.question !== text)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((qa) => qa.question);
        setSuggestedQuestions(newSuggestions);
      }, 1500);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        type: "bot",
        content: "Chat history has been cleared. How else can I assist you?",
      },
    ]);
    setSuggestedQuestions(hardcodedQA.map((qa) => qa.question));
  };

  return (
    <Card className="flex h-[calc(100vh-200px)] flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chat with Vortyx AI Assistant</CardTitle>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCcw className="mr-2 size-4" />
          Reset Chat
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[70%] items-start space-x-2 rounded-lg p-3 ${
                  message.type === "user" ? "bg-muted" : "bg-muted"
                }`}
              >
                {message.type === "bot" && <Bot className="mt-1 size-6" />}
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.type === "user" && (
                  <Avatar className="hidden sm:flex">
                    <Image
                      src="/samiah.jpeg"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="aspect-square size-full"
                    />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 rounded-lg bg-muted p-3">
                <Loader2 className="size-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="border-t p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleSend(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="mr-2 size-4" />
            Send
          </Button>
        </form>
      </div>
      <div className="border-t p-2 text-center text-sm text-muted-foreground">
        <Sparkles className="mr-1 inline-block size-4" />
        Powered by Vortyx AI Technology
      </div>
    </Card>
  );
}
