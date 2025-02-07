"use client";

import styles from "./dashboard.module.scss";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import EditModal from "@/components/modal";
import DeleteModal from "@/components/delete/deleteModal";

interface Publication {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export default function Dashboard() {
    const { data: session } = useSession();
    const [data, setData] = useState<Publication[]>([]);
    const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [publicationToDelete, setPublicationToDelete] = useState<Publication | null>(null);


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

    function handleEdit(publication: Publication) {
        setSelectedPublication(publication);
    }

    function closeEditModal() {
        setSelectedPublication(null);
    }

    function handleDelete(publication: Publication) {
        setPublicationToDelete(publication);
        setShowDeleteModal(true);
    }

    async function confirmDelete(id: string) {
        if (!session) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/publication/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.user?.accessToken}`,
                }
            });

            if (res.ok) {
                setData(data.filter(pub => pub.id !== id));
                setShowDeleteModal(false);
            } else {
                alert("Erro ao excluir a publicação");
            }
        } catch (error) {
            console.error("Erro ao excluir a publicação:", error);
        }
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <ul>
                    {data.length > 0 ? (
                        data.map((x: Publication) => (
                            <li key={x.id}>
                                <div className={styles.header}>
                                    <h3 className={styles.title}>{x.title}</h3>
                                    <button onClick={() => handleEdit(x)} className={styles.btn_edit}>Edit</button>
                                    <button onClick={() => handleDelete(x)} className={styles.btn_delete}>Delete</button>
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
            {selectedPublication && <EditModal publication={selectedPublication} onClose={closeEditModal} />}
            {showDeleteModal &&
                <DeleteModal
                    publication={publicationToDelete}
                    onConfirm={confirmDelete}
                    onClose={() => setShowDeleteModal(false)}
                />
            }
        </>
    );
}
