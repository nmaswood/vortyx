import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { VortyxHeader } from "./vortyx-header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <VortyxHeader />
      <Separator className="mb-8" />
      <main className="mt-[10%] flex  grow justify-center px-4">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardContent className="space-y-8">
            <h1 className="text-center text-3xl font-bold text-black">
              Vortyx.ai Lending Platform
            </h1>
            <div className="space-y-6">
              <p className="text-center text-sm text-gray-600">
                Choose your role to get started
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  asChild
                  variant="outline"
                  className="flex w-full items-center justify-between border-black px-4 py-6 text-black transition-colors hover:bg-gray-100"
                >
                  <Link href="/lenders">
                    <span className="grow text-center">For Lenders</span>
                    <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="flex w-full items-center justify-between border-black px-4 py-6 text-black transition-colors hover:bg-gray-100"
                >
                  <Link href="/application">
                    <span className="grow text-center">For Applicants</span>
                    <ArrowRight size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
