"use client"
import { signIn} from "next-auth/react"
import {  useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function LoginPage () {

    const router = useRouter()

    const [name, setName] =  useState('')
    const [prenom, setprenom] =  useState('')
    const [email, setEmail] =  useState('')
    const [telephone, setTelephone] =  useState('')
    const [lieu, setLieu] =  useState('')

    const userAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        // D'abord créer l'utilisateur
        const res = await fetch('/api/client', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, prenom, email, telephone, lieu }),
        });
        
        if (!res.ok) {
            const data = await res.json();
            // console.error("Erreur API:", data);
            toast.error('Impossible de créer le compte');
            return;
        }
        
        toast.success('Compte créé avec succès');
        
        // Ensuite tenter la connexion
        const signInResult = await signIn("credentials", { 
            email: email, 
            redirect: false 
        });
        
        if (!signInResult?.error) {
            // Redirection seulement si pas d'erreur
            router.push('/client/product');
        } else {
            // console.error("Échec de la connexion:", signInResult.error);
            toast.error('Connexion échouée');
        }

    } catch (err) {
        // console.error("Erreur front:", err);
        toast.error('Une erreur est survenue');
    }
}

    return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
            {/* Formulaire */}
            <form onSubmit={userAdd}  className="space-y-4 mt-4">
                <h1>Veuillez entrer vos coordonnées</h1>
                <div>
                <label className="block text-gray-700 font-medium mb-1">Nom</label>
                <input
                onChange={(e)=> {setName(e.target.value)}}
                    type="text"
                    placeholder="Entrez votre nom"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>

                <div>
                <label className="block text-gray-700 font-medium mb-1">Prénom</label>
                <input
                    type="text"
                    onChange={(e)=> {setprenom(e.target.value)}}
                    placeholder="Entrez votre prénom"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>
                <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                    type="email"
                    onChange={(e)=> {setEmail(e.target.value)}}
                    placeholder="xxxxx@gmail.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>

                <div>
                <label className="block text-gray-700 font-medium mb-1">Téléphone</label>
                <input
                    type="tel"
                    onChange={(e)=> {setTelephone(e.target.value)}}
                    placeholder="07 07 07 07 07"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>

                <div>
                <label className="block text-gray-700 font-medium mb-1">Lieu de livraison</label>
                <input
                    type="text"
                    onChange={(e)=> {setLieu(e.target.value)}}
                    placeholder="Ex: Cocody, Riviera 2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>

                    <button
                    type="submit"
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                    Valider
                    </button>
            </form>
        </div>
        </div>
)
}