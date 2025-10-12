import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/hooks/ThemeContext/ThemeContext";

export const metadata: Metadata = {
  title: "KYB Portfolio",
  description: "yunbae's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
