"use client";

import styles from "./signup.module.scss";
import React, { FormEvent, useState } from "react";
import { MdOutlineMail } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const schemaForm = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(1, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Password must be at least 6 characters"),
    userType: z.enum(["admin", "user"], { message: "Please select a user type" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormType = z.infer<typeof schemaForm>;

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: zodResolver(schemaForm),
    });
    const router = useRouter();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const signUp = async (data: FormType) => {
        console.log(data);

        const { name, email, password, userType } = data;
        let isAdmin = false;
        if(userType === "admin") {
            isAdmin = true;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/`, {
            method: "POST",
            body: JSON.stringify({ name, email, password, is_admin: isAdmin }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            router.push("/login");
        } else {
            alert("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit(signUp)}>
            <main className={styles.screen1}>
                <div className={styles.logo}>
                    <h1>BlogPay - Sign Up</h1>
                </div>

                <div className={styles.name}>
                    <label htmlFor="name">Name</label>
                    <div className={styles["section-name"]}>
                        <FaUser className={styles["icon-name"]} />
                        <input type="text" placeholder="Name" {...register("name")} />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
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
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password")}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                        <button className={styles["show-hide"]} onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className={styles.password}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className={styles["section-password"]}>
                        <FaLock className={styles["icon-password"]} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                        <button className={styles["show-hide"]} onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className={styles.userType}>
                    <div className={styles["radio-section"]}>
                        <label>
                            <input type="radio" {...register("userType")} value="admin" />
                            Admin
                        </label>
                        <label>
                            <input type="radio" {...register("userType")} value="user" />
                            Não Admin
                        </label>
                    </div>
                    {errors.userType && <span>{errors.userType.message}</span>}
                </div>

                <input className={styles.login} type="submit" value="Sign Up" />

                <footer className={styles.footer}>
                    <span onClick={() => router.replace("/login")}>Already have an account? Login</span>
                </footer>
            </main>
        </form>
    );
}
