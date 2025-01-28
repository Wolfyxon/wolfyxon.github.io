import type { Metadata } from "next";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import "./css/colors.css";
import "./css/global.css";


export const metadata: Metadata = {
  title: "Wolfyxon",
  description: "My little nerdy space on the internet",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="CEp8re5xPxShHGl3Z04NXVKOKE-OgXujmu6jYVBIXqE" />

        <script type="text/javascript" src="/js/utils.js" defer></script>
        <script type="text/javascript" src="/js/global.js" defer></script>
      </head>
      
      <body>
        {children}
      </body>
    </html>
  );
}
