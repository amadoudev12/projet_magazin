"use client"
import React, { useEffect } from 'react'
import { ShoppingCart, Check, X, Loader2 } from 'lucide-react';
import BtnCount from "../components/btnCount"
import { useState } from "react";
import type { Product } from "@prisma/client";
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const BoutiqueProduit = ({ produits }: { produits: Product[] }) => {
    const [sommeTotal, setSomme] = useState(0)
    const [cart, setCart ] = useState<{id:number, name:string, count:number, price:number , total:number}[]>([])
    const [loading, setLoading] = useState(false)

    const {data:session, status} = useSession()
    const router = useRouter()
// 10 10 2004 
    useEffect(() => {
        if(status === "loading") return
        if (status === "authenticated" && (!session.user?.telephone || !session.user?.lieuLivraison)) {
            router.push('/client/completeprofile') // ✅ Corrigé
        }
    }, [session, router, status])

    if (loading) {
    setTimeout(() => {
        setLoading(false);
    }, 3000);
    }
    const addToCart = (id: number, count: number) => {
    setCart((prev) => {
        const existing = prev.find(p => p.id === id)
        
        if (existing) {
            return prev.map(p =>
                p.id === id
                    ? { ...p, count, total: count * p.price }
                    : p
            );
        } else {
            const prod = produits.find(p => p.id === id)

            if (!prod) return prev; // Sécurité si le produit n'est pas trouvé

            return [
                ...prev,
                {
                    id,
                    name: prod.name,
                    price: prod.price,
                    total: prod.price * count,
                    count,
                },
            ]
        }
    })
    }
    useEffect(()=>{
        console.log(cart)
        const somme = cart.reduce((s,c)=> s + c.total, 0)
        setSomme(somme)
        console.log(somme)
    },[cart])

    const [viewCart , setViewCart] = useState(false)

    
return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen py-16 px-6 relative">
        {/* Bouton de confirmation panier */}
        <button
            onClick={() => setViewCart(!viewCart)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 fixed z-50 top-[12%] right-6 md:right-10 p-4 rounded-full transform hover:scale-110 group"
            title="Voir le panier"
        >
            <Check className="text-2xl group-hover:rotate-12 transition-transform" />
            {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cart.length}
            </span>
            )}
        </button>

        {/* Titre principal */}
        <div className="text-center mb-16">
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-green-100 text-orange-800 rounded-full text-sm font-medium mb-6">
                🛍️ Fraîcheur garantie
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
                Nos Produits
            </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une sélection rigoureuse de produits frais, cultivés avec passion par nos producteurs partenaires
            </p>
        </div>


        {/* Grille des produits */}
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produits.map((p) => (
                <div
                key={p.id}
                className="bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between items-center text-center h-[480px] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-100"
                >
                <div className="flex-1 flex flex-col justify-center">
                    {p.imageUrl && (
                        <Image
                        src={p.imageUrl.startsWith("/") ? p.imageUrl : `/uploads/${p.imageUrl}`}
                        alt={p.name}
                        width={160} // équivalent à w-40
                        height={160} // équivalent à h-40
                        className="object-cover rounded-2xl mx-auto mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                    )}
                    {!p.imageUrl && (
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {p.imageUrl}
                    </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {p.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {p.description}
                    </p>
                </div>

                <div className="w-full space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-4">
                    <p className="font-bold text-2xl bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                        {p.price} FCFA
                    </p>
                    </div>
                </div>
                <BtnCount productId={p.id} onCountChange={addToCart} price={p.price}/>
                </div>
            ))}
            </div>
        </div>

        {/* Modal Panier */}
        {viewCart && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 z-50">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-orange-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                        <ShoppingCart className="h-6 w-6" />
                        Vos Commandes
                        </h2>
                        <button 
                        onClick={() => setViewCart(false)}
                        className="hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                        <X className="h-6 w-6" />
                        </button>
                    </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                        <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-500 mb-2">Votre panier est vide</p>
                        <p className="text-gray-400">Ajoutez des produits pour commencer</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cart.map((c, index) => (
                            <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100"
                            >
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800 text-lg">{c.name}</p>
                                <p className="text-sm text-gray-600">Prix unitaire : {c.price} FCFA</p>
                                <p className="text-lg font-bold text-green-600">Total : {c.total} FCFA</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
                                x {c.count}
                                </span>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
{/* j'aime le code  */}
                    {/* Footer */}
                    {cart.length > 0 && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-lg text-gray-600">Total de la commande</p>
                            <p className="text-3xl font-bold text-green-600">{sommeTotal} FCFA</p>
                        </div>
                        <button
                            className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={async () => {
                                try {
                                    const res = await fetch('/api/commande', {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        items: cart.map(item => ({
                                        id: item.id,
                                        quantity: item.count,
                                        price: item.price
                                        })),
                                        total: sommeTotal,
                                    }),
                                    })
                                    const data = await res.json()
                                    if(!res.ok){
                                        toast.error(data.message)
                                        console.log(data.message)
                                        setTimeout(() => setLoading(false), 3000)
                                        setViewCart(false)
                                    }
                                    if (res.ok) {
                                        setLoading(true);
                                        toast.success(data.message || "commande enregistre avec succes")
                                            setTimeout(() => setLoading(false), 3000)
                                        setCart([])
                                        setViewCart(false)
                                    }
                                } catch (error) {
                                    console.error('erreur: ', error)
                                } 
                                // finally {
                                //     setLoading(false)
                                // }
                            }}
                        >
                            Valider la commande
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                </div>
        )}

        {/* Fenêtre de chargement */}
        {loading && (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-50">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl">
                <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-800 mb-2">Envoi de la commande...</p>
                <p className="text-gray-600">Veuillez patienter quelques instants</p>
            </div>
            </div>
        )}
    </section>
    );
}

export default BoutiqueProduit