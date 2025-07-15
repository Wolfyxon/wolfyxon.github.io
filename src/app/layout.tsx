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
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      </head>
      
      <body>
        {children}

        <ClientWorker />
      </body>
    </html>
  );
}
