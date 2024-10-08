import {
  Building,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Headset,
  MessageSquare,
  User,
} from "lucide-react";

import { VortyxHeader } from "@/app/vortyx-header";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";

export default function ApplicationDetails() {
  return (
    <div className="flex max-h-full flex-col overflow-auto">
      <VortyxHeader />
      <Separator />
      <main className="container mx-auto flex max-h-full grow flex-col overflow-auto py-8">
        <Card className="mx-auto flex max-h-full w-full max-w-4xl flex-col overflow-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Business Sale Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="flex max-h-full flex-col space-y-6 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded border-l-4 border-green-500 bg-green-100 p-4 text-green-700">
                  <p className="font-bold">Submitted Successfully</p>
                  <p className="mt-1 text-sm">
                    Your application is under review. We will contact you soon
                    with further information.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Building className="mr-2" /> Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">Kumo Beauty, Inc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">1234567890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium">Jessica Hoyt</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">Owner</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Email</p>
                  <p className="font-medium">jessica@kumo.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Phone</p>
                  <p className="font-medium">011xxxxxx</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <DollarSign className="mr-2" /> Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Seller Discretionary Earnings
                  </p>
                  <p className="text-2xl font-medium text-green-600">
                    $180,000
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Revenue</p>
                  <p className="font-medium">$759,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reason for Selling</p>
                  <Badge variant="secondary" className="mt-1">
                    Retiring
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Summary</p>
                  <p className="mt-1 font-medium">
                    Kumo Beauty sells Korean beauty and health care products for
                    women. The owner is retiring and wants to list the business
                    for sale in NYC.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="mr-2" /> Submitted Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {[
                    "Business Summary",
                    "Financial Documents",
                    "Bank Statements",
                    "Tax Returns",
                  ].map((doc) => (
                    <li key={doc} className="flex items-center">
                      <CheckCircle2 className="mr-2 text-green-500" size={16} />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>

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
