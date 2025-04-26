import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import ModeToggle from "@/components/ui/ModeToggle";
import ClerkProvider from "@/providers/ClerkProvider";
import UserButtonContainer from "@/components/ui/UserButtonContainer";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krono",
  description: "Automate seamlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${dmSans.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <UserButtonContainer/>
            <ModeToggle />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
