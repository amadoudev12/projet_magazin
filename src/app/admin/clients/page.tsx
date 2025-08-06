"use client"
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import ClientCard from "../../components/ClientCard"

export default function commandePage() {
    interface Client {
        id: number
        name: string
        prenom: string
        email: string
        telephone: string
        lieuLivraison: string
    }
    const [clients, setClient] = useState<Client[]>([])
    useEffect(()=>{
        const fetchClient = async ()=> {
            const res =await fetch('/api/client',{
            method:"GET",
            headers : {"Content-Type":"application/json"}
            })
            const data = await res.json()
            setClient(data)
            }
        fetchClient()
    },[])

    return (
        <div>
            <div className="flex flex-col justify-center mb-4">
                <h1 className="font-bold text-3xl py-2">Gestion des Clients</h1>
                <p className="text-gray-500">Vos Clients</p>
            </div>
            <div>
                <div className='flex items-center gap-9 mb-[15px]'>
                    <IoCartOutline className='text-3xl'/>
                    <h1  className='text-3xl font-bold' >Liste des Clients</h1>
                </div>
                
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>

        </div>
    )
}