export type LoanStatus = "pending" | "approved" | "rejected";

export interface Question {
  question: string;
  answer: string;
}

export interface Transaction {
  date: Date;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  aiCategory: string;
}

export interface VortyxDocument {
  id: string;
  date: Date;
  name: string;
  size: number;
  status: "pending" | "approved" | "rejected";
  description: string;
  signedUrl: string;
  parsedData: {
    value: string;
    label: string;
  }[];
  questions: Question[];
}

export interface Customer {
  id: string;
  name: string;
  lowerCaseName: string;
  email: string;
  status: LoanStatus;
  docs: number | string;
  lastUpdate: Date;
  monthlyCashBalanceData: {
    month: string;
    balance: number;
  }[];
  monthlyData: {
    month: string;
    revenue: number;
    ebitda: number;
  }[];
  transactions: Transaction[];
  documents: VortyxDocument[];
}
export const _CUSTOMERS: Customer[] = [
  {
    id: "vortyx",
    name: "Vortyx.ai",
    lowerCaseName: "vortyx.ai",
    email: "ahmed@vortyx.ai",
    status: "approved" as const,
    docs: 3,
    lastUpdate: new Date(2024, 6, 15),
    monthlyCashBalanceData: [
      { month: "Jan", balance: 1800000 },
      { month: "Feb", balance: 1900000 },
      { month: "Mar", balance: 2100000 },
      { month: "Apr", balance: 2000000 },
      { month: "May", balance: 2200000 },
      { month: "Jun", balance: 2400000 },
      { month: "Jul", balance: 2300000 },
    ],
    monthlyData: [
      { month: "Dec 2023", revenue: 750000, ebitda: 200000 },
      { month: "Jan 2024", revenue: 1200000, ebitda: 150000 },
      { month: "Feb 2024", revenue: 1150000, ebitda: 350000 },
      { month: "Mar 2024", revenue: 1450000, ebitda: 250000 },
      { month: "Apr 2024", revenue: 1350000, ebitda: -50000 },
      { month: "May 2024", revenue: 1400000, ebitda: 200000 },
      { month: "Jun 2024", revenue: 1500000, ebitda: 600000 },
      { month: "Jul 2024", revenue: 1000000, ebitda: -900000 },
    ],
    transactions: [
      {
        date: new Date(2024, 6, 17),
        description: "AI Model Upgrade",
        amount: 500000,
        status: "approved",
        aiCategory: "Technology Investment",
      },
      {
        date: new Date(2024, 6, 7),
        description: "Fintech Conference Sponsorship",
        amount: 250000,
        status: "approved",
        aiCategory: "Marketing",
      },
      {
        date: new Date(2024, 5, 28),
        description: "Cloud Infrastructure Expansion",
        amount: 100000,
        status: "pending",
        aiCategory: "Infrastructure",
      },
    ],
    documents: [
      {
        id: "fin-statement-2024",
        date: new Date(2024, 6, 26), // July 26, 2024
        name: "vortyx-financial-statement-2024.pdf",
        size: 2048, // 2 MB
        status: "approved",
        description: "Annual Financial Statement",
        signedUrl: "https://storage.googleapis.com/vortyx-sandbox-public/fin.pdf",
        parsedData: [
          { value: "Vortyx.ai", label: "Company Name" },
          { value: "SAR 26,107,500", label: "Annual Revenue" },
          { value: "SAR 2,360,700", label: "Net Profit" },
          { value: "SAR 15,000,000", label: "Total Assets" },
          { value: "SAR 5,000,000", label: "Total Liabilities" },
        ],
        questions: [
          {
            question: "What was Vortyx.ai's annual revenue in 2024?",
            answer: "SAR 26,107,500",
          },
          {
            question: "What was the company's net profit in 2024?",
            answer: "SAR 2,360,700",
          },
          {
            question:
              "What is the total asset value of Vortyx.ai according to the 2024 financial statement?",
            answer: "SAR 15,000,000",
          },
        ],
      },
      {
        id: "cr-2024",
        date: new Date(2024, 0, 15), // January 15, 2024
        name: "vortyx-commercial-registration-2024.pdf",
        size: 1024, // 1 MB
        status: "approved",
        description: "Commercial Registration",
        signedUrl: "https://storage.googleapis.com/vortyx-sandbox-public/fin.pdf",
        parsedData: [
          { value: "Vortyx.ai", label: "Company Name" },
          { value: "1010123456", label: "CR Number" },
          {
            value: "123 Tech Hub, Riyadh Digital City, Saudi Arabia",
            label: "Address",
          },
          {
            value: "Software Development and AI Services",
            label: "Business Activity",
          },
          { value: "January 15, 2025", label: "Expiry Date" },
        ],
        questions: [
          {
            question: "What is Vortyx.ai's commercial registration number?",
            answer: "1010123456",
          },
          {
            question: "When does Vortyx.ai's commercial registration expire?",
            answer: "January 15, 2025",
          },
          {
            question:
              "What is the main business activity of Vortyx.ai according to the CR?",
            answer: "Software Development and AI Services",
          },
        ],
      },

      {
        id: "bank-statement-2024-q2",
        date: new Date(2024, 6, 1), // July 1, 2024
        name: "vortyx-bank-statement-q2-2024.pdf",
        size: 1536, // 1.5 MB
        status: "approved",
        description: "Q2 2024 Bank Statement",
        signedUrl: "https://storage.googleapis.com/vortyx-sandbox-public/fin.pdf",
        parsedData: [
          { value: "Vortyx.ai", label: "Account Name" },
          { value: "SA2969101010", label: "IBAN" },
          { value: "SAR 2,400,000", label: "Opening Balance" },
          { value: "SAR 2,300,000", label: "Closing Balance" },
          { value: "SAR 4,500,000", label: "Total Credits" },
          { value: "SAR 4,600,000", label: "Total Debits" },
        ],
        questions: [
          {
            question: "What is Vortyx.ai's IBAN?",
            answer: "SA2969101010",
          },
          {
            question: "What was the closing balance for Q2 2024?",
            answer: "SAR 2,300,000",
          },
          {
            question: "What was the total amount of credits in Q2 2024?",
            answer: "SAR 4,500,000",
          },
        ],
      },
      {
        id: "tax-return-2023",
        date: new Date(2024, 3, 15), // April 15, 2024
        name: "vortyx-tax-return-2023.pdf",
        size: 1792, // 1.75 MB
        status: "approved",
        description: "2023 Tax Return",
        signedUrl: "https://storage.googleapis.com/vortyx-sandbox-public/fin.pdf",
        parsedData: [
          { value: "Vortyx.ai", label: "Company Name" },
          { value: "300000012345", label: "Tax Identification Number" },
          { value: "SAR 20,500,000", label: "Taxable Income" },
          { value: "SAR 3,075,000", label: "Total Tax Due" },
          { value: "SAR 3,100,000", label: "Tax Paid" },
        ],
        questions: [
          {
            question: "What is Vortyx.ai's Tax Identification Number?",
            answer: "300000012345",
          },
          {
            question: "What was Vortyx.ai's taxable income for 2023?",
            answer: "SAR 20,500,000",
          },
          {
            question: "How much tax did Vortyx.ai pay for the 2023 tax year?",
            answer: "SAR 3,100,000",
          },
        ],
      },
    ],
  },
  {
    id: "tawasel",
    name: "Tawasel Pay",
    lowerCaseName: "tawasel pay",
    email: "info@tawaselpay.sa",
    status: "pending" as const,
    docs: 2,
    lastUpdate: new Date(2024, 6, 20),
    monthlyCashBalanceData: [
      { month: "Jan", balance: 5000000 },
      { month: "Feb", balance: 5200000 },
      { month: "Mar", balance: 5100000 },
      { month: "Apr", balance: 5300000 },
      { month: "May", balance: 5500000 },
      { month: "Jun", balance: 5400000 },
      { month: "Jul", balance: 5600000 },
    ],
    monthlyData: [
      { month: "Dec 2023", revenue: 1200000, ebitda: 300000 },
      { month: "Jan 2024", revenue: 1300000, ebitda: 320000 },
      { month: "Feb 2024", revenue: 1250000, ebitda: 310000 },
      { month: "Mar 2024", revenue: 1400000, ebitda: 350000 },
      { month: "Apr 2024", revenue: 1450000, ebitda: 360000 },
      { month: "May 2024", revenue: 1500000, ebitda: 375000 },
      { month: "Jun 2024", revenue: 1550000, ebitda: 385000 },
      { month: "Jul 2024", revenue: 1600000, ebitda: 400000 },
    ],
    transactions: [
      {
        date: new Date(2024, 6, 15),
        description: "Payment Gateway Integration",
        amount: 200000,
        status: "approved",
        aiCategory: "Technology Investment",
      },
      {
        date: new Date(2024, 6, 5),
        description: "Marketing Campaign - Eid Al Adha",
        amount: 150000,
        status: "approved",
        aiCategory: "Marketing",
      },
      {
        date: new Date(2024, 5, 25),
        description: "Cybersecurity Upgrade",
        amount: 180000,
        status: "pending",
        aiCategory: "Security",
      },
    ],
    documents: [
      {
        id: "business-plan-2024",
        date: new Date(2024, 6, 18),
        name: "tawasel-business-plan-2024.pdf",
        size: 3072,
        status: "pending",
        description: "2024 Business Plan",
        signedUrl: "https://storage.googleapis.com/vortyx-sandbox-public/fin.pdf",
        parsedData: [
          { value: "Tawasel Pay", label: "Company Name" },
          {
            value: "456 Fintech Avenue, Jeddah Economic City, Saudi Arabia",
            label: "Address",
          },
          { value: "SA9876543210", label: "IBAN" },
          { value: "SAR 18,000,000", label: "Projected Annual Revenue" },
          { value: "SAR 4,500,000", label: "Projected Net Profit" },
        ],
        questions: [
          {
            question:
              "What is Tawasel Pay's projected annual revenue for 2024?",
            answer: "SAR 18,000,000",
          },
          {
            question: "Where is Tawasel Pay located?",
            answer: "456 Fintech Avenue, Jeddah Economic City, Saudi Arabia",
          },
          {
            question: "What is the projected net profit for 2024?",
            answer: "SAR 4,500,000",
          },
        ],
      },
    ],
  },
  {
    id: "riyal-invest",
    name: "Riyal Invest",
    lowerCaseName: "riyal invest",
    email: "support@riyalinvest.com",
    status: "rejected" as const,
    docs: 1,
    lastUpdate: new Date(2024, 6, 10),
    monthlyCashBalanceData: [
      { month: "Jan", balance: 10000000 },
      { month: "Feb", balance: 9800000 },
      { month: "Mar", balance: 9600000 },
      { month: "Apr", balance: 9400000 },
      { month: "May", balance: 9200000 },
      { month: "Jun", balance: 9000000 },
      { month: "Jul", balance: 8800000 },
    ],
    monthlyData: [
      { month: "Dec 2023", revenue: 2000000, ebitda: 500000 },
      { month: "Jan 2024", revenue: 1900000, ebitda: 475000 },
      { month: "Feb 2024", revenue: 1850000, ebitda: 460000 },
      { month: "Mar 2024", revenue: 1800000, ebitda: 450000 },
      { month: "Apr 2024", revenue: 1750000, ebitda: 435000 },
      { month: "May 2024", revenue: 1700000, ebitda: 425000 },
      { month: "Jun 2024", revenue: 1650000, ebitda: 410000 },
      { month: "Jul 2024", revenue: 1600000, ebitda: 400000 },
    ],
    transactions: [
      {
        date: new Date(2024, 6, 8),
        description: "Legacy System Maintenance",
        amount: 300000,
        status: "approved",
        aiCategory: "Technology Maintenance",
      },
      {
        date: new Date(2024, 5, 28),
        description: "Regulatory Compliance Audit",
        amount: 250000,
        status: "approved",
        aiCategory: "Legal & Compliance",
      },
      {
        date: new Date(2024, 5, 15),
        description: "Office Lease Renewal",
        amount: 500000,
        status: "rejected",
        aiCategory: "Operational Expenses",
      },
    ],
    documents: [
      {
        id: "risk-assessment-2024",
        date: new Date(2024, 6, 5),
        name: "riyal-invest-risk-assessment-2024.pdf",
        size: 1536,
        status: "approved",
        description: "Annual Risk Assessment Report",

        signedUrl: "https://storage.googleapis.com/vortyx-sandbox-public/fin.pdf",
        parsedData: [
          { value: "Riyal Invest", label: "Company Name" },
          {
            value: "789 Financial District, KAFD, Riyadh, Saudi Arabia",
            label: "Address",
          },
          { value: "SA1122334455", label: "IBAN" },
          { value: "High", label: "Overall Risk Rating" },
          { value: "SAR 1,200,000", label: "Estimated Risk Mitigation Cost" },
        ],
        questions: [
          {
            question: "What is Riyal Invest's overall risk rating for 2024?",
            answer: "High",
          },
          {
            question: "Where is Riyal Invest headquartered?",
            answer: "789 Financial District, KAFD, Riyadh, Saudi Arabia",
          },
          {
            question: "What is the estimated cost for risk mitigation in 2024?",
            answer: "SAR 1,200,000",
          },
        ],
      },
    ],
  },
];

export const CUSTOMERS: Customer[] = _CUSTOMERS.map((customer) => ({
  ...customer,
  lowerCaseName: customer.name.toLocaleLowerCase(),
}));
