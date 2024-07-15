import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

interface GlobalLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: "Todo Kanban",
  description: "Todo Kanban but with typescript, redux toolkit and rtk query.",
  image: "https://kanban-redux-tk-typescript.vercel.app/ogImg.png",
};

export default function RootLayout({ children }: GlobalLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#2B187D] p-10`}>
        {children}
      </body>
    </html>
  );
}