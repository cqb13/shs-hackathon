import { LayoutContextProvider } from "@/lib/context/LayoutContext";
import FooterNav from "@/components/layout/FooterNav";
import Header from "@/components/layout/Header";
import NavBar from "@components/layout/NavBar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hackathon.shsdevs.com"),
  title: "SHS Hackathon",
  description:
    "The official website for the SHS Hackathon, a STEM event hosted by the Sharon High School Website Development Club & Girls Who Code.",
  keywords: [
    "shs",
    "hackathon",
    "shs hackathon",
    "sharon high school",
    "sharon",
    "sharon hackathon",
    "sharon high school hackathon",
    "shs hackathon 2023",
    "sharon high school hackathon 2023",
    "Maksim Straus",
    "cqb13",
  ],
  category: "STEM",
  generator: "Next.js",
  applicationName: "SHS Hackathon",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "cqb13", url: "https://cqb13.dev" }],
  colorScheme: "dark",
  creator: "cqb13",
  publisher: "cqb13",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: "#403f4b",
  manifest: "https://hackathon.shsdevs.com/manifest.json",
  openGraph: {
    title: "SHS Hackathon",
    description:
      "The official website for the SHS Hackathon, a STEM event hosted by the Sharon High School Website Development Club & Girls Who Code.",
    url: "https://hackathon.shsdevs.com",
    siteName: "SHS Hackathon",
    images: [
      {
        url: "https://hackathon.shsdevs.com/logo/icon.png",
        width: 600,
        height: 600,
        alt: "Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": "auto",
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-white`}>
        <LayoutContextProvider>
          <NavBar />
          <Header />
        </LayoutContextProvider>
        {children}
        <footer className='border-t border-azure-600 px-80 py-28 flex flex-col justify-center items-center gap-10 max-lg:px-28 max-md:px-10 bg-onyx'>
          <FooterNav />
          <section className='flex w-full justify-between items-center'>
            <a
              className='font-space-mono text-white'
              href='https://github.com/Website-Club/shs-hackathon/blob/main/LICENSE'
              target='_blank'
            >
              Copyright © 2023 | MIT License
            </a>
            <a
              href='https://github.com/cqb13'
              className='font-space-mono text-white'
              target='_blank'
            >
              Created by: Maksim Straus
            </a>
          </section>
        </footer>
      </body>
    </html>
  );
}
