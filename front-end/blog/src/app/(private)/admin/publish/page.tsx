"use client";

import styles from "./publish.module.scss";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Publication {
    id: string;
    title: string;
    content: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export default function Publish() {
    const { data: session } = useSession();
    const [data, setData] = useState<Publication[]>([]);
    const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);


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

                setData(publications);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [session]);

    async function handlePublish(publication: Publication) {
        setSelectedPublication(null);
        try {
            if (!session) return;

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/publication/${publication.id}/update_publish/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.user?.accessToken}`,
                }
            });

            if (!res.ok) {
                alert("Error publishing publication");
            }

            const updatedPublication: Publication = await res.json();


            setData((x) => x.map((item) =>
                item.id === publication.id ? { ...item, is_published: updatedPublication.is_published, updated_at: new Date().toISOString() } : item
            ));

            return alert("Publication published successfully");
        } catch (error) {
            console.log(error);

        }

    }

    function handleHide(publication: Publication) {
        setSelectedPublication(null);
    }

    return (
        <>
            <Navbar isLoggedIn={true} />
            <div className={styles.container}>
                <main className={styles.main}>
                    <ul>
                        {data.length > 0 ? (
                            data.map((x: Publication) => (
                                <li key={x.id}>
                                    <div className={styles.header}>
                                        <h3 className={styles.title}>{x.title}</h3>
                                        {!x.is_published ? (
                                            <button onClick={() => handlePublish(x)} className={styles.btn_publish}>Publish</button>
                                        ) : (
                                            <button onClick={() => handlePublish(x)} className={styles.btn_hide}>Hide</button>
                                        )}
                                    </div>
                                    <p dangerouslySetInnerHTML={{ __html: x.content }} className={styles.context}></p>
                                    <small>Created in: {new Date(x.created_at).toLocaleString()}</small>
                                </li>
                            ))
                        ) : (
                            <p>No publications found.</p>
                        )}
                    </ul>
                </main>
            </div>
        </>
    );

}