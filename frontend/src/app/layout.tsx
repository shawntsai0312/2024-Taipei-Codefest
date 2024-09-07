import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Headbar from "./headbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARTinder",
  description: "a tinder-like app for art lovers",
  icons: {
    icon: "./icon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen overflow-y w-screen">
          <div className="w-full h-[48px] fixed top-0 bg-white">
            <Headbar />
          </div>
          <div className="w-full h-[calc(100%-96px)] fixed overflow-y top-[48px] z-10">
            {children}
          </div>
          <div className="w-full h-[48px] fixed flex justify-center bottom-0 bg-white">
            <Navbar />
          </div>
        </div>
      </body>
    </html>
  );
}
