import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import Head from "next/head";
import "./globals.css";
// import Nav from './components/navBar'
import SessionWrapper from "../../components/sessionwrapper";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daloa ~ Kalifa",
  description: "Spécialiste de la vente de tubercules : igname, manioc, patate douce et bien plus.",
    icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        {/* <Nav/> */}
        {children}
      </body>
    </html>
    </SessionWrapper>
  );
}
