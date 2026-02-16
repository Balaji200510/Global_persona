import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MappingProvider } from "@/context/MappingContext";
import { CampaignProvider } from "@/context/CampaignContext";
import { EmailAccountProvider } from "@/context/EmailAccountContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
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
      <body className={`${inter.variable} font-sans text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <NotificationProvider>
            <MappingProvider>
              <CampaignProvider>
                <EmailAccountProvider>
                  <LayoutContent>{children}</LayoutContent>
                </EmailAccountProvider>
              </CampaignProvider>
            </MappingProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
