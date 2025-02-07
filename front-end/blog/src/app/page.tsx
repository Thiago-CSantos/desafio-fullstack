import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";

export default async function Home() {
const session = await getServerSession();

  return (
    <>
      <main>
        <h1 className={styles.title}>Hello World</h1>
      </main>
    </>
  );
}
