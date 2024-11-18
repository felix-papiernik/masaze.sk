import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, phone, firstName, lastName } = req.body;
    try {
        const user = await prisma.user.create({
          data: { email, phone,  firstName, lastName },
        });
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error.message });
      }
  } else if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
