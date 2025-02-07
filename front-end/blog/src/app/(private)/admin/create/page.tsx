"use client";

import Navbar from "@/components/navbar";
import styles from "./create.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import JoditEditor from "jodit-react";
import { useState } from "react";
import { DecodedToken } from "../../../../utils/decodeda_token_jwt.ts";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const schemaForm = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
})
type FormType = z.infer<typeof schemaForm>;

export default function Create() {

    const [content, setContent] = useState<string>("");
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormType>({ resolver: zodResolver(schemaForm) });
    const router = useRouter();
    const config = {
        readonly: false,
        height: 400,
        toolbarButtonSize: 'middle' as 'small' | 'middle' | 'tiny' | 'xsmall' | 'large',
        buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source'],
        uploader: {
            insertImageAsBase64URI: true,
        },
    }

    const create = async (data: FormType) => {
        try {
            const { title, content } = data;
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token is null");
            }
            const decoded = jwtDecode<DecodedToken>(token);

            const res = await fetch(`http://localhost:8000/publication/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, id_user: decoded.user_id }),
            });
            
            if (res.status === 401) {
                return router.replace("/login");
            }

            if (res.status === 201) {
                setContent("");
                reset();
                return alert("Publication created successfully");
            }

        } catch (error) {
            console.log(error);

            throw new Error("Error creating publication");
        }
    }

    return (
        <>
            <Navbar isLoggedIn={true} />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h2>Create Publication</h2>
                    <form onSubmit={handleSubmit(create)} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.label}>Publication Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter the title"
                                maxLength={30}
                                {...register("title")}
                                className={styles.input}
                            />
                            {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content" className={styles.label}>Content</label>
                            <JoditEditor
                                value={content}
                                config={config}
                                onBlur={newContent => {
                                    setContent(newContent)
                                    setValue("content", newContent)
                                }}
                            />
                            {content ? <></> : <span className={styles.error}>{errors?.content?.message}</span>}
                        </div>

                        <button type="submit" className={styles.submitBtn}>Create Publication</button>
                    </form>
                </div>
            </main>
        </>
    )
}