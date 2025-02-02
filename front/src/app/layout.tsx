import type { Metadata } from "next";
import "./globals.css";
import GridBackground from "@/components/ui/GridBackground";
import Header from "@/components/ui/Header";
import ApolloProviderClient from "@/apollo/apolloProvider";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "../../utils/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <GridBackground>
            <Header />
            <ApolloProviderClient>
              <Toaster />
              {children}
            </ApolloProviderClient>
          </GridBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
