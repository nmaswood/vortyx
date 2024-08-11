import { Clock, Headset, MessageSquare, User } from "lucide-react";

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

export const SupportModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <Headset className="mr-2 size-4" /> Support
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
  );
};
