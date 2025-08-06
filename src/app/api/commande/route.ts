// app/api/commandes/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authoptions"
import prisma from "../../../../lib/prisma"
type OrderItem = {
    id: number
    quantity: number
    price: number
}
export async function GET() {
    try{
    const AllCommandes = await prisma.order.findMany({
        include : {
            user: true,
            orderItems:{
                include : {
                    product : {
                        select : {name:true}
                    }
                }
            }
        }
    }) 
    return NextResponse.json(AllCommandes)   
    }catch(Erreur){
        console.error('erreur:',Erreur)
    }
}
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Non autorisé", message:"veuillez vous connecté" }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        })
        if (!user) {
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
        }
        const body = await req.json()
        const { items, total } = body
        if (!total || !items || items.length === 0) {
            return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
        }
        const order = await prisma.order.create({
        data: {
            userId: user.id,
            total,
            orderItems: { // <- correction ici
            create: items.map((b: OrderItem) => ({
                productId: b.id,
                quantity: b.quantity,
                price: b.price,
            })),
            },
        },
        })
        return NextResponse.json({ message: "Commande enregistrée", orderId: order.id }, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la commande :", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
    const body = await req.json();
    const id = Number(body.id);         
    const livree = Boolean(body.livree) 

    // ✅ Utiliser update
    const orderEdit = await prisma.order.update({
        where: { id },
        data: {
            status: livree,
        },
    });

    return NextResponse.json({
        order: orderEdit,
        message: "Statut modifié avec succès ✅",
        });
    } catch (erreur) {
        console.error(erreur);
        return NextResponse.json(
        { erreur: erreur, message: "Erreur lors de la modification" },
        { status: 500 }
        );
    }
}
