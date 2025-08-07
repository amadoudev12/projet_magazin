// "use client" // <-- Ne pas mettre "use client" si tu utilises Prisma côté serveur
import prisma from "../../../../lib/prisma";
import type { product } from "@prisma/client";
import BoutiqueProduit from "../../components/BoutiqueProduit";

export const dynamic = 'force-dynamic';  // <<< Ajout ici

export default async function BoutiquePage() {
    const produits: product[] = await prisma.product.findMany();
    return (
        <div>
            <BoutiqueProduit produits={produits} />
        </div>
    )
}
