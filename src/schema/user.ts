import { z } from "zod";
import { Role } from '@prisma/client';

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
