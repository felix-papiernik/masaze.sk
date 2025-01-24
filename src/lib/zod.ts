import { Role, User } from "@prisma/client";
import { z } from "zod";

export type CreateUserData = Pick<User, "email" | "phone" | "firstName" | "lastName" | "password">;

const password = z.string().min(8, "Heslo musí mať aspoň 8 znakov");
const email = z.string().min(1, "Email je povinný").email("Nesprávny formát emailu");
const phoneNumberRegex = /^[0-9]{10}$/;

export const validateCreateUserData = (data: CreateUserData) => {

    const parsedUser = z.object({
        firstName: z.string().min(1, "Krstné meno je povinné"),
        lastName: z.string().min(1, "Priezvisko je povinné"),
        phone: z.string().regex(phoneNumberRegex, "Tel.číslo musí obsahovať iba číslice a musí mať dĺžku 10 znakov"),
        email: email,
        password: password,
    }).safeParse(data);

    return parsedUser;
}

export interface UpdateUserData extends Omit<CreateUserData, "password"> { }
export const validateUpdateUserData = (data: UpdateUserData) => {
    const parsedUser = z.object({
        firstName: z.string().min(1, "Krstné meno je povinné"),
        lastName: z.string().min(1, "Priezvisko je povinné"),
        phone: z.string().regex(phoneNumberRegex, "Tel.číslo musí obsahovať iba číslice a musí mať dĺžku 10 znakov"),
        email: email
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


export const UserSchema = z.object({
    id: z.number(),
    email: z.string().email("Nesprávna emailová adresa"),
    password: z.string().min(8, "Heslo musí mať aspoň 8 znakov"),
    role: z.enum(Object.keys(Role) as [keyof typeof Role]),
    phone: z.string().min(10, "Telefónne číslo musí mať aspoň 10 znakov").max(12, "Telefónne číslo môže mať najviac 12 znakov"),
    firstName: z.string(),
    lastName: z.string(),
});

export const partialUserSchema = UserSchema.partial();