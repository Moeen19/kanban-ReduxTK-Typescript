import { Inter } from "next/font/google";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
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
    title: "Todo Kanban",
    description: "Todo Kanban but with typescript, redux toolkit and rtk query.",
    images: [
      {
        url: "https://kanban-redux-tk-typescript.vercel.app/ogImg.png",
        width: 800,
        height: 600,
        alt: "Todo Kanban Image"
      }
    ],
    url: "https://kanban-redux-tk-typescript.vercel.app/",
    type: "website"
  }
};

export default function RootLayout({ children }: GlobalLayoutProps) {
  const [loader, setLoader] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 100000)
  }, [])
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:secure_url" content={metadata.openGraph.images[0].url} />
      </Head>
      <body className={`${inter.className} bg-[#2B187D] p-10`}>
        {loader && <div className="flex gap-[5px] h-screen w-full items-center justify-center">
          <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
        </div>}
        <div className={`${loader ? 'opacity-0' : 'opacity-100'} transition-all ease-in-out duration-300`}>
          {children}
        </div>
      </body>
    </html>
  );
}