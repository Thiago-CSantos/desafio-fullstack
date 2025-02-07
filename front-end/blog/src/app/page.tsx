import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  redirect("/login");

  return (
    <>
      <main>
        <h1 className={styles.title}>Hello World</h1>
      </main>
    </>
  );
}
