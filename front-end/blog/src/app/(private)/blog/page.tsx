"use client";

import styles from "./blog.module.scss";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Publication {
    id: string;
    title: string;
    content: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export default function Blog() {
    const { data: session } = useSession();
    const [data, setData] = useState<Publication[]>([]);

    useEffect(() => {

        async function fetchData() {

            if (!session) {
                return;
            }
            console.log(session);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/publication/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session?.user?.accessToken}`,
                    }
                });

                const publications = await res.json();
                console.log(publications);

                setData(publications);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [session]);

    return (
        <>
            <Navbar isLoggedIn={true}/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1>Dashboard</h1>
                    <p className={styles.name}>Hello, {session?.user.name}!</p>
                    <div className={styles.division}></div>
                    <ul>
                        {data.length > 0 ? (
                            data.map((x: Publication) => {
                                if (x.is_published) {
                                    return (
                                        <li key={x.id}>
                                            <div className={styles.header}>
                                                <h3 className={styles.title}>{x.title}</h3>
                                            </div>
                                            <p dangerouslySetInnerHTML={{ __html: x.content }} className={styles.context}></p>
                                            <small>Created in: {new Date(x.created_at).toLocaleString()}</small>
                                        </li>
                                    )
                                }
                            }
                            )
                        ) : (
                            <p>No publications found.</p>
                        )}
                    </ul>
                </div>
            </main>
        </>
    );
}