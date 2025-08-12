import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
    const body = await req.json()
    try {
        if(body.items === "user"){
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`)
        }else if(body.items === "product"){
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "product" RESTART IDENTITY CASCADE`);
        }else if(body.items === "order"){
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "order" RESTART IDENTITY CASCADE`);
        }
    return NextResponse.json(
        { message: "Suppression effectuée avec succès" },
        { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
        { error: (error as Error).message || "Erreur inconnue" },
        { status: 500 }
        );
    }
}
