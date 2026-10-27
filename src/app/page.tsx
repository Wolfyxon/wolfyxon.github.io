import { Metadata } from "next";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "Wolfyxon | My website",
  description: "Hi, I'm Wolfyxon. I'm a guy who loves programming " +
               "and dealing with all kinds of software. " +
               "This is my website, where you can see my projects and other stuff I make."
}

export default function IndexPage() {
  return <HomePage/>
}
