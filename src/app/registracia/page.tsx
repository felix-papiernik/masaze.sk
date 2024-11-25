'use client';

import { signUp } from '@/lib/actions';
import React, { useState } from 'react';
import { useActionState } from 'react';

export default function page() {
    const [state, formAction, isPending] = useActionState(
        signUp,
        undefined,
    );

    const fields = [
        { type: "text", placeholder: "Meno", id: "firstName", name: "firstName" },
        { type: "text", placeholder: "Priezvisko", id: "lastName", name: "lastName" },
        { type: "tel", placeholder: "Tel.č.", id: "phone", name: "phone" },
        { type: "email", placeholder: "Email", id: "email", name: "email" },
        { type: "text", placeholder: "password", id: "password", name: "password" },
    ]

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const handleClick = (e) => {
        // "use server";
        e.preventDefault();
        console.log('handleClick');
    }

    return (
        <div>
            <h1>Registrácia</h1>
            <form
                action={formAction}
                style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}
            >
                {fields.map((field) => (
                    <React.Fragment key={field.name}>
                        <input key={field.id} {...field} />
                        {state && state[field.name] && (
                            <div style={{ color: "red" }}>{state[field.name]}</div>
                        )}
                    </React.Fragment>
                ))}
                <button type="submit" disabled={isPending}>Registrovať sa action</button>
            </form>

            <form
                style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}
            >
                {Object.keys(formData).map((key) => (
                    <React.Fragment key={key}>
                        <input
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        />
                    </React.Fragment>
                ))}
                <button type="submit" disabled={isPending} onClick={handleClick}>Registrovať sa onClick</button>
            </form>
        </div>
    )
}
