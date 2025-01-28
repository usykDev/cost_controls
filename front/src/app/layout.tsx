import type { Metadata } from "next";
import "./globals.css";
import GridBackground from "@/components/ui/GridBackground";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Cost control",
  description: "Tracking all costs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authUser = true;

  return (
    <html lang="en">
      <body>
        <GridBackground>
          {authUser && <Header />}
          {children}
        </GridBackground>
      </body>
    </html>
  );
}
