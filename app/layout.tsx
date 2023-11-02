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
    "cqb13"
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
    telephone: false
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
        alt: "Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/icon.png"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
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
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
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
              © SHS Web Dev
            </a>
            <a
              href='https://github.com/Website-Club/shs-hackathon'
              target='_blank'
            >
              <svg
                fill='white'
                width='30px'
                height='30px'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                data-name='Layer 1'
              >
                <path d='M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z' />
              </svg>
            </a>
          </section>
        </footer>
      </body>
    </html>
  );
}
