import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth/next";


export default async function Admin() {
    const session = await getServerSession();
    console.log(session, "aaa");
    
    return (
        <>
        <Navbar />
        <main>
            ds
        </main>
        </>
    );
}