import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { CookiesProvider } from "react-cookie";

const roboto = Roboto_Mono({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classy DBMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("", roboto.className)}>{children}</body>
    </html>
  );
}
