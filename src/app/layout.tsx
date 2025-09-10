import type { Metadata } from "next";
import ClientWorker from "./ClientWorker";

import "./css/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Wolfyxon",
    default: "Wolfyxon"
  },

  description: "My little nerdy space on the internet",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="CEp8re5xPxShHGl3Z04NXVKOKE-OgXujmu6jYVBIXqE" />

        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>

        {/* css @import() broke lol */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"></link>
      </head>
      
      <body>
        {children}

        <ClientWorker />
      </body>
    </html>
  );
}
