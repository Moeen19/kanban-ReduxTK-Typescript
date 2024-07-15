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
  openGraph: {
    images: [
      {
        url: "https://kanban-redux-tk-typescript.vercel.app/ogImg.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({ children }: GlobalLayoutProps) {
  return (
    <html lang="en">
      {/* <Head>
        <title>Todo Kanban</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:image:width" content="800"/>
        <meta property="og:image:height" content="600"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kanban-redux-tk-typescript.vercel.app/" />
      </Head> */}
      <body className={`${inter.className} bg-[#2B187D] p-10`}>
        {children}
      </body>
    </html>
  );
}