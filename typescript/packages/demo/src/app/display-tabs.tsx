"use client";
import { BarChart, Bell, Building2, LucideIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { z } from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { SupportModal } from "./application/support-modal";

export const ZPathname = z.enum(["/lenders/rules", "/"]);

export const DisplayTabs: React.FC = () => {
  const pathname = usePathname();
  const parsed = ZPathname.safeParse(pathname);
  console.log(pathname, parsed);
  const tab = parsed.success ? parsed.data : "/";

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex w-full flex-row justify-center gap-6 px-8 py-3 md:justify-between">
        <div className="flex flex-row items-center gap-3">
          <Link href="/">
            <h2 className="text-xl font-semibold">vortyx.ai</h2>
          </Link>
        </div>
      </div>
      <nav className="flex h-full flex-col justify-between gap-1 p-2">
        <div className={cn("flex flex-col gap-1")}>
          <SarjLink
            Icon={Building2}
            title="Companies"
            href="/lenders"
            selected={tab === "/"}
            disabled={false}
          />
          <SarjLink
            Icon={BarChart}
            title="Rules"
            href="/lenders/rules"
            selected={tab === "/lenders/rules"}
            disabled={false}
          />
        </div>
      </nav>
      <div className="flex flex-col gap-1">
        <SupportModal />
        <NotificationsModal />
        <SettingsModal />

        <Separator className="w-full" />
        <div className="flex items-center gap-4 p-3">
          <Avatar className="hidden sm:flex">
            <Image
              src="/ahmed.jpeg"
              width={40}
              height={40}
              alt="Avatar"
              className="aspect-square size-full"
            />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Ahmed AlMadan</p>
            <p className="text-sm text-muted-foreground">ahmed@vortyx.ai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <Settings className="mr-2 size-4" /> Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your Sarj.ai experience
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-insights">Enable AI Insights</Label>
            <Switch id="ai-insights" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NotificationsModal: React.FC = () => {
  const fakeNotifications = [
    {
      id: 1,
      title: "New AI Insight Available",
      description: "Check out the latest risk analysis for Company XYZ.",
    },
    {
      id: 2,
      title: "Loan Application Update",
      description: "The status of application #1234 has changed.",
    },
    {
      id: 3,
      title: "System Maintenance",
      description: "Scheduled maintenance on July 30th, 2:00 AM - 4:00 AM GMT.",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <Bell className="mr-2 size-4" /> Notifications
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            Stay updated with the latest information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {fakeNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-2 rounded border p-2"
            >
              <Bell className="mt-1 size-5 text-blue-500" />
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-gray-600">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SarjLink: React.FC<{
  Icon: LucideIcon;
  title: string;
  href: string;
  selected: boolean;
  disabled: boolean;
  className?: string;
}> = ({ Icon, title, href, selected, disabled, className }) => {
  return (
    <Button
      disabled={disabled}
      asChild
      variant="ghost"
      size="sm"
      className={cn("justify-start gap-2", selected && "bg-muted", className)}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg",
          selected && "bg-muted",
          disabled && "opacity-50",
          disabled && "pointer-events-none",
        )}
      >
        <Icon className="size-4" />
        <span className="hidden md:block">{title}</span>
      </Link>
    </Button>
  );
};
