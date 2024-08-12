"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Target,
  DollarSign,
  Briefcase,
  Building,
  Users,
  Calendar,
  Globe,
  ChevronRight,
  ArrowUpRight,
  Heart,
  Store,
  Scissors,
  Coffee,
  Plus,
} from "lucide-react";

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
const businessInterests = [
  //{ type: "Med Spa", icon: Spa },
  { type: "Beauty Clinic", icon: Heart },
  { type: "Beauty Store", Icon: Store },
  { type: "Hair Salon", Icon: Scissors },
  { type: "Café", Icon: Coffee },
];

// Main component
const BuyerDashboard: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<DealMatch | null>(null);

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

  // Handler for deal click
  const handleDealClick = (deal: DealMatch): void => {
    setSelectedDeal(deal);
  };

  return (
    <div className="flex h-full max-h-full flex-col overflow-auto p-8 w-full">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <User className="mr-2 h-6 w-6" />
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
                      <Target className="mr-1 h-3 w-3" />
                      {buyerProfile.purchaseLocations.join(", ")}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      SDE: {buyerProfile.targetSDE}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      Buy Range: {buyerProfile.targetBuyRange}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Briefcase className="mr-2 h-5 w-5" />
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
                  <Calendar className="mr-2 h-5 w-5" />
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

        <TabsContent value="matches" className="flex w-full flex-col">
          <Card className="flex w-full flex-col">
            <CardHeader>
              <CardTitle>Deal Matches</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full flex-col">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>SDE</TableHead>
                    <TableHead>Match Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealMatches.map((deal) => (
                    <TableRow
                      key={deal.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleDealClick(deal)}
                    >
                      <TableCell className="font-medium">{deal.name}</TableCell>
                      <TableCell>{deal.state}</TableCell>
                      <TableCell>{deal.buyPrice}</TableCell>
                      <TableCell>{deal.sde}</TableCell>
                      <TableCell>
                        <Badge>{deal.matchScore}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedDeal && (
        <Dialog
          open={!!selectedDeal}
          onOpenChange={() => setSelectedDeal(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDeal.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <p>
                <strong>Location:</strong> {selectedDeal.state}
              </p>
              <p>
                <strong>Asking Price:</strong> {selectedDeal.buyPrice}
              </p>
              <p>
                <strong>Seller Discretionary Earnings:</strong>{" "}
                {selectedDeal.sde}
              </p>
              <p>
                <strong>Broker:</strong> {selectedDeal.broker}
              </p>
              <p>
                <strong>Match Score:</strong> {selectedDeal.matchScore}%
              </p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setSelectedDeal(null)} variant="outline">
                Close
              </Button>
              <Button>Request More Info</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const ProfileField: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0 text-gray-400">{icon}</div>
    <div>
      <Label className="text-sm text-gray-500">{label}</Label>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default BuyerDashboard;
