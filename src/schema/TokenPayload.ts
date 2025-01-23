import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface UserTokenPayload extends JwtPayload {
    user: User;
}