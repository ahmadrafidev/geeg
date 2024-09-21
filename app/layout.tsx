import type { Metadata } from "next";
import { Londrina_Solid } from "next/font/google";
import "./globals.css";

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Geeg - A Talent Finder Platform",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${londrinaSolid.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
