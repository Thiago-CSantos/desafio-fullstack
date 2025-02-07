import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        await fetch("http://localhost:8000/logout/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>BlogPay</div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/admin/create">Create</Link>
        </li>
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/publish">Publish</Link>
        </li>
        <li>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
