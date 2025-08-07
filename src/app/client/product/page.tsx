// "use client"
import prisma from "../../../../lib/prisma";
import type { Product } from "@prisma/client";
import BoutiqueProduit from "../../components/BoutiqueProduit";
// import Loading from "../../components/loading";
// import CardCommande from  "../components/CardCommande"


export default async function BoutiquePage() {
    
    const produits : Product[] = await prisma.product.findMany();
    // typer produits 
    return (
        <div>
            <BoutiqueProduit produits = {produits} />
            {/* <CardCommande order={order} /> */}
        </div>
        
    )
}