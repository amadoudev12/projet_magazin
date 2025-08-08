import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        await prisma.$connect();
        res.status(200).json({ message: 'Connexion OK ✅' });
    } catch (error) {
        res.status(500).json({ 
        message: 'Connexion échouée ❌', 
        error: error.message 
        });
    } finally {
        await prisma.$disconnect();
    }
    }
