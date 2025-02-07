import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/login");

}
