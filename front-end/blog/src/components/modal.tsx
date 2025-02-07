"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
interface Publication {
    id: string;
    title: string;
    content: string;
}

interface EditModalProps {
    publication: Publication;
    onClose: () => void;
}

export default function EditModal({ publication, onClose }: EditModalProps) {
    const { data: session } = useSession();
    const [title, setTitle] = useState(publication.title);
    const [content, setContent] = useState(publication.content);

    const config = {
        readonly: false,
        height: 400,
        toolbarButtonSize: 'middle' as 'small' | 'middle' | 'tiny' | 'xsmall' | 'large',
        buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source'],
        uploader: {
            insertImageAsBase64URI: true,
        },
    }

    async function handleSave() {
        try {

            if (!session) {
                return;
            }
            console.log(session, "modal");


            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/publication/${publication.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.user?.accessToken}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                alert("Post updated!");
                onClose();
                window.location.reload();
            } else {
                alert("Error updating publication");
            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    }

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h2>Edit Post</h2>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    maxLength={30}
                    placeholder="Title"
                />
                <JoditEditor
                    value={content}
                    config={config}
                    onBlur={newContent => {
                        setContent(newContent)
                    }}
                />
                <div className={styles.buttons}>
                    <button onClick={handleSave} className={styles.btn_save}>Save</button>
                    <button onClick={onClose} className={styles.btn_cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
