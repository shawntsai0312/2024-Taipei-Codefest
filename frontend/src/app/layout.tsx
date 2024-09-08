import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Headbar from "./headbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "去哪玩",
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
        <div className="h-screen w-screen flex flex-col">
          <div className="flex-grow overflow-y-auto h-[calc(100%-48px)]">
            {children}
          </div>
          <div className="h-[48px] bg-white flex items-center justify-center"/>
          <div className="w-full h-[48px] fixed bottom-0 bg-white flex justify-center items-center">
            <Navbar />
          </div>
        </div>
      </body>
    </html>
  );
}
