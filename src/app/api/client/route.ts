import { error } from "console";
import {  NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
// import { use } from "react";

export async function GET() {
    try{
        const AllClients = await prisma.user.findMany()
        return NextResponse.json(AllClients)
    }catch(erreur){
        console.error('erreur',erreur)
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const existingUser = await prisma.user.findUnique({
            where : {email: body.email}
        })
        if(existingUser){
            return NextResponse.json({message:"utilisateur deja connecté"},{status:201})
        }
        const newUser = await prisma.User.create({
            data : {
                name: body.name,
                prenom: body.prenom,
                email: body.email,
                telephone: body.telephone,
                lieuLivraison: body.lieu
            }
        })
        //creation du token 
        const token = jwt.sign(
            {
            id: newUser.id,
            name: newUser.name,
            prenom:newUser.prenom,
            email:newUser.email,
            telephone:newUser.telephone,
            lieuLivraison: newUser.lieuLivraison
            },
            process.env.NEXTAUTH_SECRET!,
            {expiresIn: "1h"} // une duree de 1h
        )
        
        return NextResponse.json({message: "utlisateur enregistré avec succes",token,user:newUser},{status:201})
    }catch(error){
        console.error("erreur lors de l'enregistrement de commande ",error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

export async function PUT(req:Request){
    const body = await req.json()
    const session = await getServerSession(authOptions)
    if (!session || !session.user.email) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }
    try{
        await prisma.user.update({
            where : {email: session?.user.email},
            data:{
                telephone: body.telephone,
                lieuLivraison: body.lieu
            }
        })
    }catch(error){
        console.error('erreur:',error)
    }

    return NextResponse.json({message:"vous êtes bien connectés"},{status:201})
}