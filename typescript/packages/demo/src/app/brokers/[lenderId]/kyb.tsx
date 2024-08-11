import {
  Building,
  Calendar,
  Check,
  Globe,
  Linkedin,
  MapPin,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function KYBTab() {
  const companyData = {
    name: "Kumo Beauty",
    founded: 2002,
    size: "5-10 employees",
    location: "New York, USA",
    website: "https://kumobeauty.com/",
    linkedinUrl: "https://www.linkedin.com/company/kumo-beauty",
    description:
      "Kumo Beauty sells Korean beauty and health care products for women. The owner is retiring and wants to list the business for sale in NYC.",
    keyPeople: [
      {
        name: "Jessica Hoyt",
        title: "Owner",
        email: "jessica@kumo.com",
        phone: "011xxxxxx",
      },
    ],
    recentNews: [
      {
        title:
          "Kumo Beauty is listed as a fan favorite beauty store in Brooklyn",
        date: "2024-07-01",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <CompanyOverviewSection companyData={companyData} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DealStatusSection />
        <LatestNewsSection companyData={companyData} />
      </div>
      <KeyPeopleSection companyData={companyData} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CompanyOverviewSection({ companyData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <Building className="mr-2 size-6" />
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{companyData.description}</p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <InfoBadge
              icon={<Calendar className="size-4" />}
              text={`Founded: ${companyData.founded}`}
            />
            <InfoBadge
              icon={<Users className="size-4" />}
              text={companyData.size}
            />
            <InfoBadge
              icon={<MapPin className="size-4" />}
              text={companyData.location}
            />
          </div>
          <Separator />
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <UnclickableLink
              icon={<Globe className="size-4" />}
              text="Website"
            />
            <UnclickableLink
              icon={<Linkedin className="size-4" />}
              text="LinkedIn"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InfoBadge({ icon, text }: any) {
  return (
    <Badge
      variant="secondary"
      className="flex items-center space-x-1 bg-white px-2 py-1 text-sm"
    >
      {icon}
      <span>{text}</span>
    </Badge>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UnclickableLink({ icon, text }: any) {
  return (
    <span className="flex items-center space-x-1 rounded-full bg-white px-3 py-1 text-sm text-blue-600 shadow-sm">
      {icon}
      <span>{text}</span>
    </span>
  );
}

function DealStatusSection() {
  const dealStatusItems = [
    { text: "Preliminary Interview", status: "Passed" },
    { text: "Business Valuation Assessment", status: "Passed" },
    { text: "Engagement Agreement", status: "Passed" },
    { text: "CIM Production", status: "Active" },
    { text: "Data Room Onboarded", status: "Passed" },
    { text: "Marketing Activity Report", status: "Active" },
    { text: "Buyer Search", status: "Active" },
    { text: "Letters of Intent (LOI)", status: "Active" },
    { text: "Negotiation", status: "Active" },
    { text: "Due Diligence", status: "Pending" },
    { text: "Closing", status: "Pending" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Check className="mr-2 size-5 text-green-500" />
          Deal Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dealStatusItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 rounded-lg p-2"
            >
              <span className="grow text-sm font-medium">{item.text}</span>
              <Badge variant="secondary">{item.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LatestNewsSection({ companyData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Globe className="mr-2 size-5" />
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {companyData.recentNews.map((news: any, index: any) => (
          <div key={index} className="mb-2 rounded-lg bg-gray-50 p-2">
            <p className="text-sm font-medium">{news.title}</p>
            <p className="text-xs text-gray-600">{news.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function KeyPeopleSection({ companyData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Users className="mr-2 size-6" />
          Key People
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {companyData.keyPeople.map((person: any, index: any) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{person.name}</h3>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Position:</span> {person.title}
              </div>
              <div>
                <span className="font-medium">Business Email:</span>{" "}
                {person.email}
              </div>
              <div>
                <span className="font-medium">Business Phone:</span>{" "}
                {person.phone}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
