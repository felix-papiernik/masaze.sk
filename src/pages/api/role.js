import { PrismaClient } from "@prisma/client";
require("dotenv").config();

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { userId } = req.query; // Assuming userId is passed in the request

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        const bcrypt = require("bcrypt");
        if (user.role === "SUPERADMIN") {
            const bcrypt = require("bcrypt");
            const passToHash = "heslo123";
            const passwordMatches = await bcrypt.compare(
                passToHash,
                user.password,
            );

            res.status(200).json({
                content: `Welcome SuperAdmin! Your newly hashed password ${passToHash} ${
                    passwordMatches ? "matches" : "does not match"
                } the stored hashed password ${user.password}`,
            });
        } else if (user.role === "OWNER") {
            res.status(200).json({ content: "Welcome Owner!" });
        } else if (user.role === "MASSEUR") {
            res.status(200).json({ content: "Welcome Masseur!" });
        } else if (user.role === "CLIENT") {
            res.status(200).json({ content: "Welcome Client!" });
        } else {
            res.status(403).json({ error: "Access Denied" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch user",
            details: error.message,
        });
    }
}
