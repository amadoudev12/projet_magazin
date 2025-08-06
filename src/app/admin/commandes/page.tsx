"use client"
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import CommandCard from "../../components/CommandCard"

export default function CommandePage() {
    interface Commande {
    id: number;
    user: {
    name: string;
    prenom: string;
    telephone: string;
    lieuLivraison: string;
    };
    total: number;
    orderItems: OrderItem[]; // Remplace OrderItem par le type correct de tes items
    createdAt: Date; // ou string si ça vient d'un JSON
    }

    interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
    product : {name:string}
    }
    const [commandes, setCommandes ] = useState<Commande[]>([])
    // const [selectedId, setSelectedId] = useState<number | null>(null)
    

    useEffect(()=>{
        const GetOrders = async ()=>{
            const res = await fetch('/api/commande',{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            const data = await res.json()
            if(res.ok){
                setCommandes(data)
            }
        }
        GetOrders()
    },[])
    return (
        <div>
            <div className="mt-10 flex flex-col justify-center mb-4">
                <h1 className="font-bold text-3xl py-2">Gestion des commandes</h1>
                <p className="text-gray-500">Gérez et suivez toutes les commandes de votre boutique</p>
            </div>
            <div>
                <div className='flex items-center gap-9 mb-[15px]'>
                    <IoCartOutline className='text-3xl'/>
                    <h1  className='text-3xl font-bold' >Liste des commandes</h1>
                </div>
                
            </div>

            <div className="space-y-4">
                {commandes.map((commande) => (
                    <CommandCard key={commande.id} commande={commande}/>
                ))}
            </div>

        </div>
    )
}