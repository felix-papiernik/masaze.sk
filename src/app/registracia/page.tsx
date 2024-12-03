'use client';

import { CreateUserData, validateCreateUserData } from '@/lib/zodValidations';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const createUserData: CreateUserData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
}

export default function Page() {

    const [formData, setFormData] = useState({ ...createUserData });
    const [errors, setErrors] = useState({ ...createUserData, general: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        event?.preventDefault();
        setIsSubmitting(true);
        setErrors({ ...createUserData, general: "" });

        const parsedUser = validateCreateUserData(formData);
        console.log("validacia na strane klienta")
        if (!parsedUser.success) {
            let newErrors = { ...createUserData };
            parsedUser.error.errors.forEach((err) => {
                const key = err.path[0];
                if (key) {
                    newErrors = { ...newErrors, [key]: err.message };
                }
            });
            setIsSubmitting(false);
            setErrors({ ...newErrors, general: "Formulár obsahuje chyby" });
            return;
        }

        try {
            const response = await fetch(`/api/signup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log("body", JSON.stringify(formData));

            if (response.ok) {
                //const res = response.status;
                // console.log("response.json()", res);
                alert("Registrácia prebehla úspešne");
                router.push('/prihlasenie');
            } else {
                const data = await response.json();
                // console.log("response", data);
                setErrors({ ...createUserData, general: "Registrácia sa nepodarila. " + data.error });
            }
        } catch (err) {
            console.error('Sign-up error:', err);
            alert("Registrácia sa nepodarila");
        } finally {
            setIsSubmitting(false);
        }
    };

    // console.log("formData", formData);

    const getLabel = (key: string) => {
        switch (key) {
            case 'firstName':
                return 'Meno';
            case 'lastName':
                return 'Priezvisko';
            case 'phone':
                return 'Telefón';
            case 'email':
                return 'Email';
            case 'password':
                return 'Heslo';
            default:
                return '';
        }
    }

    return (
        <Box sx={{ width: { xs: "100%", md: "60vw", lg: "600px" }, mx: "auto" }}>
            <Typography variant="h1" mb={2} textAlign={"center"}>Registrácia</Typography>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {Object.keys(formData).map((key) => (

                    <React.Fragment key={key}>
                        <TextField
                            label={getLabel(key)}
                            name={key}
                            type={'text'}
                            required
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            error={errors[key as keyof typeof errors] !== "" ? true : false}
                            helperText={errors[key as keyof typeof errors]}
                        />
                    </React.Fragment>
                ))}
                {errors.general && <Typography color="error">{errors.general}</Typography>}
                <Button type="submit" disabled={isSubmitting} variant="contained" onClick={handleSubmit}>{isSubmitting ? "Odosiela sa..." : "Registrovať sa"}</Button>
            </Box>
        </Box>
    )
}
