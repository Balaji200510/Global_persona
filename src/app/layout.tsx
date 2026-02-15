import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MappingProvider } from "@/context/MappingContext";
import { CampaignProvider } from "@/context/CampaignContext";
import { EmailAccountProvider } from "@/context/EmailAccountContext";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "Performance Overview Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <MappingProvider>
            <CampaignProvider>
              <EmailAccountProvider>
                <LayoutContent>{children}</LayoutContent>
              </EmailAccountProvider>
            </CampaignProvider>
          </MappingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
