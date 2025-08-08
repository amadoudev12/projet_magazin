import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

let prisma

try {
    prisma = globalForPrisma.prisma || new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    console.log('Prisma client initialized successfully')
    } catch (error) {
    console.error('Error initializing Prisma client:', error)
}

export default prisma
