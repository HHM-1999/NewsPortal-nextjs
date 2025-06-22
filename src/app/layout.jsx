// import { Geist } from 'geist/font'; // Assuming Geist is being used like this
// import { Geist_Mono } from 'geist/font/mono'; // Adjust if needed
import { Tiro_Bangla } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackToTopButton from '@/components/common/BackToTopButton';

// Load fonts
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
  weight: ["400"], // Tiro Bangla only has weight 400
});

// Metadata
export const metadata = {
  metadataBase: new URL("https://NewsPortal24.com/"),
  title: {
    default: "NewsPortal",
  },
  description: "NewsPortal - Breaking News, Latest Headlines & More",
};

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${tiroBangla.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <BackToTopButton />
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.min.js"
          integrity="sha384-RuyvpeZCxMJCqVUGFI0Do1mQrods/hhxYlcVfGPOfQtPJh0JCw12tUAZ/Mv10S7D"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
