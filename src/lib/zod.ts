import { z } from "zod";

export interface CreateUserData extends UpdateUserData {
    heslo: string;
}

const password = z.string().min(8, "Heslo musí mať aspoň 8 znakov");
const email = z.string().min(1, "Email je povinný").email("Nesprávny formát emailu");
const phoneNumberRegex = /^[0-9]{10}$/;

export const validateCreateUserData = (data: CreateUserData) => {

    const parsedUser = z.object({
        meno: z.string().min(1, "Krstné meno je povinné"),
        priezvisko: z.string().min(1, "Priezvisko je povinné"),
        email: email,
        heslo: password,
    }).safeParse(data);

    return parsedUser;
}

interface UpdateUserData {
    meno: string;
    priezvisko: string;
    email: string;
}

export const validateUpdateUserData = (data: UpdateUserData) => {
    const parsedUser = z.object({
        meno: z.string().min(1, "Krstné meno je povinné"),
        priezvisko: z.string().min(1, "Priezvisko je povinné"),
        email: email,
    }).safeParse(data);

    return parsedUser;
}

export type LoginData = {
    email: string;
    password: string;
}

export const validateLoginData = (data: LoginData) => {
    const parsedUser = z.object({
        email: email,
        password: password,
    }).safeParse(data);

    return parsedUser;
}

export const knihaSchema = z.object({
    nazov: z.string().min(1, "Názov je povinný"),
    rok_vydania: z.number().int().min(0, "Rok vydania musí byť kladné číslo"),
    pocet_stran: z.number().int().min(1, "Počet strán musí byť kladné číslo"),
    autor_id: z.number().int().min(0, "Autor je povinný"),
    zaner_id: z.number().int().min(0, "Žáner je povinný"),
});

export const validateKnihaData = (data: { nazov: string, rok_vydania: number, pocet_stran: number }) => {
    const parsedKniha = knihaSchema.safeParse(data);
    return parsedKniha;
}