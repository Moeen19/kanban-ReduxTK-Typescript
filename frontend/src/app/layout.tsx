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
      <Head>
        <title>Todo Kanban</title>
        <meta property="og:description" content="Todo project but with Typescript, Redux Toolkit and RTK Query." />
        <meta property="og:title" content="Todo Kanban" />
        <meta property="og:description" content="Todo project but with Typescript, Redux Toolkit and RTK Query." />
        <meta property="og:image" content="https://kanban-redux-tk-typescript.vercel.app/ogImg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kanban-redux-tk-typescript.vercel.app/" />
      </Head>
      <body className={`${inter.className} bg-[#2B187D] p-10`}>
        {children}
      </body>
    </html>
  );
}