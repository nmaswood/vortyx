"use client";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Store,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Define types for our data structures
type BuyerProfile = {
  name: string;
  email: string;
  phone: string;
  state: string;
  purchaseLocations: string[];
  targetSDE: string;
  targetBuyRange: string;
  businessType: string;
};

type DealMatch = {
  id: number;
  name: string;
  state: string;
  buyPrice: string;
  sde: string;
  broker: string;
  matchScore: number;
};

const BuyerDashboard: React.FC = () => {
  // Mock data for buyer profile
  const buyerProfile: BuyerProfile = {
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    state: "NY",
    purchaseLocations: ["NY", "NJ", "CT", "PA"],
    targetSDE: "$150,000 - $300,000",
    targetBuyRange: "$700,000 - $1,300,000",
    businessType: "Searching for a Med Spa, Beauty Clinic, Beauty store.",
  };

  // Mock data for deal matches
  const dealMatches: DealMatch[] = [
    {
      id: 1,
      name: "Kumo Beauty",
      state: "NY",
      buyPrice: "$759,000",
      sde: "$180,000",
      broker: "John Doe",
      matchScore: 92,
    },
    {
      id: 2,
      name: "Glow Clinic",
      state: "NJ",
      buyPrice: "$850,000",
      sde: "$200,000",
      broker: "Jane Smith",
      matchScore: 88,
    },
    {
      id: 3,
      name: "Zen Spa",
      state: "CT",
      buyPrice: "$950,000",
      sde: "$220,000",
      broker: "Bob Johnson",
      matchScore: 85,
    },
  ];

  const { toast } = useToast();

  const handleRequestDetails = (deal: DealMatch) => {
    toast({
      title: "Request Sent",
      description: `Your request for details on ${deal.name} has been sent to the broker.`,
    });
  };

  return (
    <div className="flex size-full max-h-full flex-col overflow-auto p-8">
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Buyers</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Buyer Profile</TabsTrigger>
          <TabsTrigger value="matches">Deal Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <User className="mr-2 size-6" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <ProfileField
                    icon={<User />}
                    label="Name"
                    value={buyerProfile.name}
                  />
                  <ProfileField
                    icon={<Mail />}
                    label="Email"
                    value={buyerProfile.email}
                  />
                  <ProfileField
                    icon={<Phone />}
                    label="Phone"
                    value={buyerProfile.phone}
                  />
                  <ProfileField
                    icon={<MapPin />}
                    label="State"
                    value={buyerProfile.state}
                  />
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <h3 className="font-semibold">Acquisition Criteria</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center">
                      <Target className="mr-1 size-3" />
                      {buyerProfile.purchaseLocations.join(", ")}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <DollarSign className="mr-1 size-3" />
                      SDE: {buyerProfile.targetSDE}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <DollarSign className="mr-1 size-3" />
                      Buy Range: {buyerProfile.targetBuyRange}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Briefcase className="mr-2 size-5" />
                  Business Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Med Spa
                  </Badge>
                  <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                    Beauty Clinic
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    Beauty Store
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Hair Salon
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    Café
                  </Badge>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  {buyerProfile.businessType}
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Calendar className="mr-2 size-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024-08-05</TableCell>
                      <TableCell>Viewed Kumo Beauty listing</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Completed</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-08-03</TableCell>
                      <TableCell>Updated acquisition criteria</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Completed</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-08-01</TableCell>
                      <TableCell>Scheduled call with broker</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <Target className="mr-2 size-5" />
                Deal Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dealMatches.map((deal) => (
                  <Card
                    key={deal.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                            <Store className="size-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {deal.name}
                            </h3>
                            <p className="flex items-center text-sm text-gray-500">
                              <MapPin className="mr-1 size-4" /> {deal.state}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-lg font-semibold"
                        >
                          {deal.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="size-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-500">
                              Asking Price
                            </p>
                            <p className="font-semibold">{deal.buyPrice}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="size-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">SDE</p>
                            <p className="font-semibold">{deal.sde}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="size-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-500">Broker</p>
                            <p className="font-semibold">{deal.broker}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRequestDetails(deal)}
                            className="flex items-center"
                          >
                            <Mail className="mr-2 size-4" />
                            Request Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ProfileField: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="shrink-0 text-gray-400">{icon}</div>
    <div>
      <Label className="text-sm text-gray-500">{label}</Label>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default BuyerDashboard;
