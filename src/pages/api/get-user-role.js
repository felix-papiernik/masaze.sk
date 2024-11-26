// /pages/api/get-role.ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  try {
    const prisma = new PrismaClient();
    const { email } = req.query;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user?.role) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ role: user?.role });
  } catch (error) {
    console.log("Error: ", error)
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(500).end(`Method ${req.method} Not Allowed`);
  }
}
