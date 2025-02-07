import styles from "@/styles/not-found.module.scss";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.errorMessage}>Page Not Found</h2>
            <p className={styles.description}>Sorry, the page you are looking for does not exist.</p>
            <Link href={"/"} className={styles.homeButton}>
                Back to Home
            </Link>
        </div>
    );
}