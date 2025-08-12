import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import authOptions from "../../../../lib/authoptions";

export async function GET() {
    try {
        const AllClients = await prisma.user.findMany();
        return NextResponse.json(AllClients);
    }catch (erreur) {
        console.error('Erreur GET /api/client:', erreur);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
    }

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
        });
        if (existingUser) {
        return NextResponse.json(
            { message: "utilisateur déjà connecté" },
            { status: 201 }
        );
        }
        const newUser = await prisma.user.create({   // Correction ici : 'user' en minuscule
        data: {
            name: body.name,
            prenom: body.prenom,
            email: body.email,
            telephone: body.telephone,
            lieuLivraison: body.lieu,
        },
        })
        if (!process.env.NEXTAUTH_SECRET) {
        throw new Error("NEXTAUTH_SECRET non défini");
        }
        // création du token
        const token = jwt.sign(
        {
            id: newUser.id,
            name: newUser.name,
            prenom: newUser.prenom,
            email: newUser.email,
            telephone: newUser.telephone,
            lieuLivraison: newUser.lieuLivraison,
        },
        process.env.NEXTAUTH_SECRET,
        { expiresIn: "30d" }
        );
        return NextResponse.json(
        { message: "utilisateur enregistré avec succès", token, user: newUser },
        { status: 201 }
        );
    } catch (error) {
        console.error("Erreur POST /api/client:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
    }
//     export async function PUT(req: Request) {
//     try {
//         const body = await req.json();
//         const session = await getServerSession(authOptions);
//         if (!session || !session.user.email) {
//         return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
//         }
//         await prisma.user.update({
//         where: { email: session.user.email },
//         data: {
//             telephone: body.telephone,
//             lieuLivraison: body.lieu,
//         },
//         });
//         return NextResponse.json(
//         { message: "Mise à jour réussie" },
//         { status: 200 }
//         );
//     } catch (error) {
//         console.error("Erreur PUT /api/client:", error);
//         return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//     }
// }
