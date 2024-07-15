import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

interface GlobalLayoutProps {
  children: ReactNode
}

// export const metadata = {
//   title: "Todo Kanban",
//   description: "Todo Kanban but with typescript, redux toolkit and rtk query.",
// };

export default function RootLayout({ children }: GlobalLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Todo Kanban</title>
        <meta property="og:title" content="Todo Kanban" />
        <meta property="og:description" content="Todo project but with Typescript, Redux Toolkit and RTK Query." />
        <meta property="og:image" content="/ogImg.png" />
      </head>
      <body className={`${inter.className} bg-[#2B187D] p-10`}>
        {children}
      </body>
    </html>
  );
}