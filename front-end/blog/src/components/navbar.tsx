import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const res = await fetch("http://localhost:8000/logout/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");

        router.replace("/login");
      }
      router.replace("/login");

    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>BlogPay</div>
      <ul className={styles.navLinks}>
        <li>
          {isLoggedIn ?? <Link href="/admin/create">Create</Link>}
        </li>
        <li>
          {isLoggedIn ?? <Link href="/admin/dashboard">Dashboard</Link>}
        </li>
        <li>
          {isLoggedIn ?? <Link href="/admin/publish">Publish</Link>}
        </li>
        <li>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
