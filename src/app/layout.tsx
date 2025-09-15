import type { Metadata } from "next";
import ClientWorker from "../components/essential/ClientWorker";

import "@/css/global.css";
import Root from "@/layouts/Root";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Wolfyxon",
    default: "Wolfyxon"
  },

  description: "My little nerdy space on the internet",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {  
  if(React.isValidElement(children) && children.type == Root) {
    return children;
  }

  return (
    <Root>
      <head></head>
      <body>{children}</body>
    </Root>
  );
}
