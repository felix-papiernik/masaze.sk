import { User } from "@prisma/client";
import { z } from "zod";

export type CreateUserData = Pick<User, "email" | "phone" | "firstName" | "lastName" | "password">;

const password = z.string().min(8, "Heslo musí mať aspoň 8 znakov");
const email = z.string().min(1, "Email je povinný").email("Nesprávny formát emailu");

export const validateCreateUserData = (data: CreateUserData) => {
    const phoneNumberRegex = /^[0-9]{10,13}$/;

    const parsedUser = z.object({
        firstName: z.string().min(1, "Krstné meno je povinné"),
        lastName: z.string().min(1, "Priezvisko je povinné"),
        phone: z.string().regex(phoneNumberRegex, "Tel.číslo musí obsahovať iba číslice a mať dĺžku medzi 10 a 13 znakmi"),
        email: email,
        password: password,
    }).safeParse(data);

    return parsedUser;
}

export type LoginData = Pick<User, "email" | "password">;

export const validateLoginData = (data: LoginData) => {
    const parsedUser = z.object({
        email: email,
        password: password,
    }).safeParse(data);

    return parsedUser;
}

export type UpdateUserData = Pick<User, "firstName" | "lastName">;
export const validateupdateUserData = (data: UpdateUserData) => {
    const parsedUser = z.object({
        firstName: z.string().min(1, "Krstné meno je povinné"),
        lastName: z.string().min(1, "Priezvisko je povinné"),
    }).safeParse(data);

    return parsedUser;
}