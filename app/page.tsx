import Link from "next/link";
import Shell from "./components/Shell";
import Mum from "./components/Mum";
import { HER_NAME, FROM_NAME } from "./data";

export default function Home() {
  return (
    <Shell
      bg="linear-gradient(180deg,#2a1738 0%,#5b2a52 48%,#c7646a 82%,#f0a06a 100%)"
      petals={["#ffe3a1", "#f4a259"]}
    corners={["lemon", "gold"]}
    >
      <Mum id="hero" palette="gold" />
      <h1>Hi {HER_NAME}, this is for you.</h1>
      <p className="message">
        I made a small garden for you. Theres nothing to do here except read and rest for a minute.
      </p>
      <Link href="/note/1" className="btn">Walk into the garden</Link>
      <p className="sign">With warmth, from {FROM_NAME}</p>
    </Shell>
  );
}