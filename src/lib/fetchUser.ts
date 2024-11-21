import { User } from "@prisma/client";

// Helper function to fetch the user object
export async function fetchUser(): Promise<User | null> {
    try {
        const response = await fetch(`${process.env.URL}/api/get-current-user`, { cache: "no-store" });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }

    return null;
}