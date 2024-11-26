'use client';

import { signUp } from '@/lib/actions';
import { init } from 'next/dist/compiled/webpack/webpack';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useActionState } from 'react';

export const createUserData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
}

export default function page() {

    const [formData, setFormData] = useState<typeof createUserData>({ ...createUserData });

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log("body", JSON.stringify(formData));

            if (response.ok) {
                const res = response.status;
                // console.log("response.json()", res);
                alert("Registrácia prebehla úspešne");
                router.push('/prihlasenie');
            } else {
                const data = await response.json();
                // console.log("response", data);
                setError(data.error || null);
            }
        } catch (err) {
            // console.error('Sign-up error:', err);
            setError("Nastala chyba, skúste to znova");
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log("formData", formData);

    return (
        <div>
            <h1>Registrácia</h1>

            <form
                onSubmit={handleSubmit}
                style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12, maxWidth: 500, padding: 8 }}
            >
                {Object.keys(formData).map((key) => (

                    <React.Fragment key={key}>
                        <input
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        />
                        {
                            // error[key] && (
                            //     <span style={{ color: "red", fontSize: "0.875rem" }}>
                            //         {error[key]}
                            //     </span>
                            // )
                        }
                    </React.Fragment>
                ))}
                {error && <span style={{ color: "red", fontSize: "0.875rem" }}>
                    {error}
                </span>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={(e) => handleSubmit}>{isSubmitting ? "Odosiela sa..." : "Registrovať sa"}</button>
            </form>
        </div>
    )
}
