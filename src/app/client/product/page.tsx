// "use client"
import prisma from "../../../../lib/prisma";
import type {product} from "@prisma/client";
import BoutiqueProduit from "../../components/BoutiqueProduit";

export default async function BoutiquePage() {
    
    const produits : product[] = await prisma.product.findMany();
    // typer produits 
    return (
        <div>
            <BoutiqueProduit produits = {produits} />
            {/* <CardCommande order={order} /> */}
        </div>
        
    )
}