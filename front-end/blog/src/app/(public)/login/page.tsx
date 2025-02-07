"use client";

import styles from "./login.module.scss";
import React, { FormEvent, useState } from "react";
import { MdOutlineMail } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../../utils/decodeda_token_jwt.ts";

const schemaForm = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required")
})
type FormType = z.infer<typeof schemaForm>;

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormType>({ resolver: zodResolver(schemaForm) });
    const router = useRouter();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const login = async (data: FormType) => {
        const { email, password } = data;

        signIn("credentials", {
            email,
            password,
            redirect: false
        });

        const session = await fetch("/api/auth/session").then(res => res.json());
        const decoded: DecodedToken = jwtDecode<DecodedToken>(session.user.accessToken);
        console.log(session);

        localStorage.setItem("token", session.user.accessToken);
        localStorage.setItem("refresh_token", session.user.refresh);

        if (decoded.is_admin) {
            return router.replace("/admin/dashboard");
        }
        return router.replace("/blog");

    }

    return (

        <form onSubmit={handleSubmit(login)}>
            <main className={styles.screen1}>
                <div className={styles.logo}>
                    <h1>BlogPay</h1>
                </div>

                <div className={styles.email}>
                    <label htmlFor="email">Email Address</label>
                    <div className={styles["section-email"]}>
                        <MdOutlineMail className={styles["icon-email"]} />
                        <input type="email" placeholder="Email" {...register("email")} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                </div>

                <div className={styles.password}>
                    <label htmlFor="password">Password</label>
                    <div className={styles["section-password"]}>
                        <FaLock className={styles["icon-password"]} />
                        <input type={showPassword ? "text" : "password"}
                            placeholder="Password" {...register("password")} />
                        {errors.password && <span>{errors.password.message}</span>}
                        <button className={styles["show-hide"]}
                            onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <input className={styles.login} type="submit" value="Login" />

                <footer className={styles.footer}>
                    <span>Sign Up</span>
                    <span>Forgot Password?</span>
                </footer>
            </main>
        </form>

    );
}
