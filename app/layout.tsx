import type { Metadata } from "next";

import { Londrina_Solid, Poppins } from "next/font/google";
import "./globals.css";

import Provider from "./provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Geeg - A Talent Finder Platform",
  description:
    "Geeg is a talent finder platform to make it easy to you finished your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${poppins.variable} ${londrinaSolid.variable} antialiased`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
