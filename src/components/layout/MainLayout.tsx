import type { ReactNode } from "react";

import { AnimatedBackground } from "@/components/common/AnimatedBackground";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="text-foreground relative flex h-dvh flex-col overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
