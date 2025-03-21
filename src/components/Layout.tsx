
import { ReactNode } from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 page-transition">
        {children || <Outlet />}
      </main>
      <footer className="py-8 bg-secondary/50 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            FinoTalk © {new Date().getFullYear()} - Financial knowledge powered by Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
