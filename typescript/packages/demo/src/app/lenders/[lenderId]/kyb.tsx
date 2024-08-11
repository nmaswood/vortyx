import {
  Building,
  Calendar,
  Check,
  Globe,
  Linkedin,
  MapPin,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export function KYBTab() {
  const companyData = {
    name: "Sarj.ai",
    founded: 2023,
    industry: "Artificial Intelligence",
    size: "5-10 employees",
    location: "Riyadh, Saudi Arabia",
    website: "https://vortyx.ai",
    linkedinUrl: "https://www.linkedin.com/company/vortyx-ai",
    twitterHandle: "@vortyx_ai",
    description:
      "Sarj.ai is a leading AI company in Saudi Arabia, specializing in natural language processing and machine learning solutions for the finance industry.",
    keyPeople: [
      { name: "Ahmed Al-Madan", title: "CEO & Co-founder" },
      { name: "Nasr Maswood", title: "CTO & Co-founder" },
    ],
    recentNews: [
      { title: "Sarj.ai Secures $50M Series B Funding", date: "2024-06-15" },
      {
        title: "Partnership with Major Saudi Bank Announced",
        date: "2024-05-22",
      },
    ],
    aiInsights: {
      growthScore: 85,
      riskScore: 20,
      marketPosition: "Leader",
      competitiveAdvantage: "Proprietary NLP algorithms",
      challenges: ["Talent acquisition", "Regulatory compliance"],
    },
  };

  return (
    <div className="space-y-6">
      <CompanyOverviewSection companyData={companyData} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ComplianceCheckSection />
        <DigitalFootprintSection companyData={companyData} />
      </div>
      <KeyPeopleSection />
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
        <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
          <div className="grow space-y-3">
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
              <SocialLink
                href={companyData.website}
                icon={<Globe className="size-4" />}
                text="Website"
              />
              <SocialLink
                href={companyData.linkedinUrl}
                icon={<Linkedin className="size-4" />}
                text="LinkedIn"
              />
              <SocialLink
                href={`https://twitter.com/${companyData.twitterHandle.slice(1)}`}
                icon={<Twitter className="size-4" />}
                text={companyData.twitterHandle}
              />
            </div>
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
function SocialLink({ href, icon, text }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1 rounded-full bg-white px-3 py-1 text-sm text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

function ComplianceCheckSection() {
  const complianceItems = [
    { text: "Anti-Money Laundering (AML) Check", status: "Passed" },
    { text: "Sanctions List", status: "Clear" },
    { text: "Beneficial Ownership", status: "Verified" },
    { text: "SAMA (Saudi Central Bank) Compliance", status: "Verified" },
    { text: "Ministry of Commerce Registration", status: "Active" },
    {
      text: "Zakat, Tax and Customs Authority (ZATCA) Compliance",
      status: "In Good Standing",
    },
    { text: "Saudi Payments Certification", status: "Approved" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Check className="mr-2 size-5 text-green-500" />
          Compliance Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 rounded-lg  p-2"
            >
              <Check className="size-5 text-green-500" />
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
function DigitalFootprintSection({ companyData }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Globe className="mr-2 size-5" />
          Digital Footprint
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold">Social Media Presence</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              LinkedIn: Strong
            </Badge>
            <Badge variant="secondary" className="bg-sky-100 text-sky-700">
              Twitter: Moderate
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              Facebook: Weak
            </Badge>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Online Reputation</h3>
          <div className="flex items-center space-x-2">
            <Progress value={85} className="grow" />
            <span className="text-sm font-medium text-green-600">85%</span>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Positive sentiment based on customer reviews and mentions
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "AWS", "Docker", "MongoDB"].map(
              (tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-indigo-50 text-indigo-700"
                >
                  {tech}
                </Badge>
              ),
            )}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="mb-2 font-semibold">Latest News</h3>
          {companyData.recentNews.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (news: any, index: any) => (
              <div key={index} className="mb-2 rounded-lg bg-gray-50 p-2">
                <p className="text-sm font-medium">{news.title}</p>
                <p className="text-xs text-gray-600">{news.date}</p>
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function KeyPeopleSection() {
  const keyPeople = [
    {
      name: "Ahmed AlMadan",
      title: "CEO & Co-founder",
      education: "Northwestern University, BS in Computer Science",
      achievements: [
        "Full-ride merit scholarship",
        "Qimam Fellow",
        "Little Joe Ventures Fellow",
      ],
      experience: [
        "Entrepreneur in Residence at Sukna Ventures",
        "Founding Partner at Deepdish Capital",
        "Investor & Syndicate Lead for multiple startups",
      ],
      image: "/ahmed.jpeg",
    },
    {
      name: "Nasr Maswood",
      title: "CTO & Co-founder",
      education: "University of Chicago, BS in Computer Science",
      expertise: ["Web Development", "Python", "Software Engineering"],
      experience: [
        "Engineering Lead at Songbird Therapy",
        "Senior Software Engineer / Tech Lead at Labelbox",
        "Co-Founder of ThirtyNine.ai (acquired by Labelbox)",
      ],
      image: "/nasr.jpeg",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold">
          <Users className="mr-2 size-6" />
          Key People
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {keyPeople.map((person, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500">
                <Avatar className="absolute -bottom-16 left-4 size-32 border-4 border-white">
                  <Image
                    src={person.image}
                    width={64}
                    height={64}
                    alt={person.name}
                    className="aspect-square size-full"
                  />

                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="mt-20">
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="mb-2 text-sm text-gray-600">{person.title}</p>
                <Separator className="my-3" />
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Education:</span>{" "}
                    {person.education}
                  </p>
                  {person.achievements && (
                    <div>
                      <span className="font-medium">Achievements:</span>
                      <ul className="list-inside list-disc">
                        {person.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {person.expertise && (
                    <div>
                      <span className="font-medium">Expertise:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {person.expertise.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Experience:</span>
                    <ul className="list-inside list-disc">
                      {person.experience.map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
