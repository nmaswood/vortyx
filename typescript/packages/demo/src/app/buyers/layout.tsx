import { Separator } from "@/components/ui/separator";

import { DisplayTabs } from "../display-tabs";

export const metadata = {
  title: "Vortyx | Lender Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="size-screen flex size-full flex-row">
      <div className="grid-rows-[auto,auto, 1fr] grid h-full w-60">
        <DisplayTabs />
      </div>
      <Separator orientation="vertical" />
      {children}
    </main>
  );
}
