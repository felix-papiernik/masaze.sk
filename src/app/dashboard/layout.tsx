import Link from "next/link";
import { signOut } from "../../../auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{background: "green", padding: 16}}>
            <h1>Layout</h1>
            <ul style={{display: "flex", gap: "20px"}}>
                <li>
                    <Link href="/dashboard/">Dashboard</Link>
                </li>
                <li>
                    <Link href="/dashboard/masaze/">masaze</Link>
                </li>
            </ul>
            <button onClick={async () => {
                "use server";
                await signOut();
            }}>Odlásiť sa</button>
            {children}
        </div>
    );
}