import { Metadata } from "next";
import HomePage, {metadata as homeMeta} from "./home/page";

export const metadata: Metadata = homeMeta; 

export default function IndexPage() {
  return <HomePage/>
}