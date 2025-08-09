"use client"

import { useState } from "react"
import toast from "react-hot-toast"

export default function ProductAdd() {
    const [name, setProduitName] = useState("")
    const [description, setProduitdesc] = useState("")
    const [price, setProduitPrice] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null)
    // const router = useRouter()

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        if (imageFile) formData.append("image", imageFile);
        try {
            const res = await fetch('/api/product', {
                method: "POST",
                body: formData
            });
            if (res.ok) {
                // alert("Produit enregistré !");
                toast.success('produit enregistré avec succes')
                setProduitName("");
                setProduitdesc("");
                setProduitPrice("");
                setImageFile(null);
                // router.push('/');
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            alert("Erreur serveur:"+error);
        }
    }
    return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
    <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4"
    >
        <h2 className="text-2xl font-bold text-center text-gray-800">Ajouter un produit</h2>

        <input 
        onChange={(e) => setProduitName(e.target.value)} 
        type="text" 
        placeholder="Nom du produit" 
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input 
        onChange={(e) => setProduitdesc(e.target.value)} 
        type="text" 
        placeholder="Description du produit" 
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input 
        onChange={(e) => setProduitPrice(e.target.value)} 
        type="text" 
        placeholder="Prix du produit" 
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input 
        onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
        type="file" 
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
        Envoyer
        </button>
    </form>
</div>

    )
}