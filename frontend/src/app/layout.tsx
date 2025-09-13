import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Subscription Management System",
  description: "Comprehensive subscription and billing management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
