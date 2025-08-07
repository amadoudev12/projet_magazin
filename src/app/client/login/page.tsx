"use client"
import { signIn, useSession} from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage () {
    const {data:session} = useSession()

    const router = useRouter()
    const [showForm, setShowForm] = useState(false)

    const [name, setName] =  useState('')
    const [prenom, setprenom] =  useState('')
    const [email, setEmail] =  useState('')
    const [telephone, setTelephone] =  useState('')
    const [lieu, setLieu] =  useState('')


    const handleClickBtn = () =>{
        signIn('google')
    } 
    useEffect(() => {
        if (session && (!session.user?.telephone || !session.user?.lieuLivraison)) {
            router.push('/client/completeprofile') // ✅ Corrigé
        }
        if(session){
            router.push('/client/product')
        }
    }, [session, router])


        const userAdd = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const res = await fetch('/api/client', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, prenom, email, telephone, lieu })
                });
                const data = await res.json();
                if (!res.ok) {
                console.error("Erreur API:", data);
                console.log(data.error || data.message || "Erreur lors de l'inscription.");
                return;
                }

                await signIn("credentials", { email: email });
                console.log(data.message);
                router.push('/client/product');
            }catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Erreur front:", err.message);
            } else {
                console.error("Erreur front inconnue:", err);
            }
            console.log("Une erreur est survenue.");
            }
        };


    return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">

        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h1 className="text-2xl font-bold text-green-700 text-center">
            Bienvenue sur AgriVente
            </h1>
            <p className="text-gray-500 text-center text-sm">
            Choisissez une méthode pour continuer
            </p>

        {/* Choix 1 : Connexion Google */}
        <button
            onClick={()=>{handleClickBtn()}}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200"
            >
            {/* <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.684 32.65 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.843 1.154 7.949 3.051l5.657-5.657C33.728 6.72 28.108 4 22 4 11.507 4 3 12.507 3 23s8.507 19 19 19c10.493 0 19-8.507 19-19 0-1.279-.134-2.534-.389-3.734z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.507 16.175 18.918 13 24 13c3.059 0 5.843 1.154 7.949 3.051l5.657-5.657C33.728 6.72 28.108 4 22 4 14.061 4 7.171 8.486 3.306 14.691z"/>
                <path fill="#4CAF50" d="M24 43c5.1 0 9.703-1.948 13.122-5.122l-6.071-5.356C28.883 33.831 26.551 34.5 24 34.5c-5.194 0-9.59-3.514-11.126-8.271l-6.568 4.824C9.04 38.703 16.013 43 24 43z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303C33.684 32.65 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.843 1.154 7.949 3.051l5.657-5.657C33.728 6.72 28.108 4 22 4 11.507 4 3 12.507 3 23s8.507 19 19 19c10.493 0 19-8.507 19-19 0-1.279-.134-2.534-.389-3.734z"/>
            </svg> */}
            Se connecter avec Google
            </button>
            <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            {/* Bouton pour afficher le formulaire */}
            {!showForm && (
            <button
                onClick={() => setShowForm(true)}
                className="w-full py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
                Entrer mes informations manuellement
            </button>
            )}
            {/* Formulaire */}
            {showForm && (
            <form onSubmit={userAdd}  className="space-y-4 mt-4">
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
            )}
        </div>
        </div>
)
}