"use client"
import Link from 'next/link'
import { FaSearch } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProduitPage() {

    interface Produit {
        id: number,
        name: string,
        description: string,
        price: string
    }

    const [allProduits, setProduits] = useState<Produit[]>([])
    const [newNameProduct, setNameProduct] = useState('')
    const [newPrice, setPrice] = useState('')
    const [newDesc, setDesc] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    // Récupération des produits
    useEffect(() => {
        const produitGet = async () => {
            const res = await fetch('/api/product', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            if (res.ok) {
                setProduits(data)
            }
        }
        produitGet()
    }, [])

    // Suppression d'un produit
    const deleteProduct = async (id: number) => {
        const res = await fetch('/api/product', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        // const data = await res.json()
        if (res.ok) {
            // alert(data.message)
            toast.success('Produit supprimé avec succes')
            setProduits((prev) => prev.filter(p => p.id !== id))
        }
        if(!res.ok){
            toast.error('erreur lors de la suppression, veuillez essayer encore')
        }
    }

    // Soumission du formulaire d'édition
    const handleEditForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!selectedId) return

        const res = await fetch('/api/product', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: selectedId,
                name: newNameProduct,
                description: newDesc,
                price: newPrice
            })
        })

        // const data = await res.json()
        if (res.ok) {
            // j'aime le code 
            // alert(data.message)
            toast.success('produit modifié')
            setProduits((prev) =>
                prev.map(p =>
                    p.id === selectedId ? { ...p, name: newNameProduct, description: newDesc, price: newPrice } : p
                )
            )
            setShowForm(false)
            setSelectedId(null)
            setNameProduct('')
            setDesc('')
            setPrice('')
        }
    }

    // Ouvrir le formulaire avec les données du produit à éditer
    const openEditForm = (produit: Produit) => {
        setSelectedId(produit.id)
        setNameProduct(produit.name)
        setDesc(produit.description)
        setPrice(produit.price)
        setShowForm(true)
    }

    return (
        <div>
            <div className="flex flex-col justify-center mb-4">
                <h1 className="font-bold text-3xl py-2">Gestion des Produits</h1>
                <p className="text-gray-500">Gérez votre inventaire</p>
            </div>

            <div className='mb-[45px] flex flex-wrap justify-between items-center gap-7'>
                <div className="px-3 py-2 w-[80%] border border-gray-400 flex items-center gap-4 rounded-lg">
                    <FaSearch />
                    <input className='w-[80%] border-0 outline-0' type="text" placeholder="Rechercher des produits" />
                </div>
                <Link className='flex items-center gap-2 text-white font-bold text-[15px] hover:bg-green-500 py-3 px-10 bg-green-800 rounded-2xl' href="productAdd">
                    <span>+</span> <span> Ajouter un Produit</span>
                </Link>
            </div>

            <div className='flex items-center gap-3 mb-[15px]'>
                <AiFillProduct className='text-3xl' />
                <h1 className='text-3xl font-bold'>Liste des Produits</h1>
            </div>

            {/* TABLEAU pour desktop */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">ID Produit</th>
                            <th className="px-4 py-3 text-left">Nom du Produit</th>
                            <th className="px-4 py-3 text-left">Catégorie</th>
                            <th className="px-4 py-3 text-left">Prix</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allProduits.map(produit => (
                            <tr key={produit.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 font-medium text-gray-700">{produit.id}</td>
                                <td className="px-4 py-2 text-gray-600">{produit.name}</td>
                                <td className="px-4 py-2 text-gray-600">{produit.description}</td>
                                <td className="px-4 py-2 text-gray-800 font-semibold">{produit.price}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => deleteProduct(produit.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        onClick={() => openEditForm(produit)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                    >
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CARTES pour mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 md:hidden">
                {allProduits.map(produit => (
                    <div
                        key={produit.id}
                        className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-5"
                    >
                        <h2 className="text-green-600 font-bold text-lg mb-2">#{produit.id} - {produit.name}</h2>
                        <p className="text-gray-600 mb-2">{produit.description}</p>
                        <p className="text-gray-800 font-semibold mb-4">{produit.price} FCFA</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => deleteProduct(produit.id)}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Supprimer
                            </button>
                            <button
                                onClick={() => openEditForm(produit)}
                                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FORMULAIRE D'ÉDITION */}
            {showForm && (
                <form
                    onSubmit={handleEditForm}
                    className="mt-6 p-6 bg-white border rounded-xl shadow-md space-y-4 w-full max-w-md mx-auto"
                >
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Modifier le produit #{selectedId}</h2>

                    <input
                        type="text"
                        placeholder="Nom du produit"
                        value={newNameProduct}
                        onChange={(e) => setNameProduct(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <textarea
                        placeholder="Description"
                        value={newDesc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                    ></textarea>
                    <input
                        type="number"
                        placeholder="Prix"
                        value={newPrice}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div className="flex gap-2">
                        <button
                            
                            type="submit"
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Enregistrer
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
