"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function ProfileCompleted(){
    const [telephone, setTelephone] =  useState('')
    const [lieu, setLieu] =  useState('')
    const router = useRouter()
    const profileCompleted = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try{
            const res = await fetch('/api/client',{
                method:"PUT",
                headers : {"Content-Type":"application/json"},
                body : JSON.stringify({telephone, lieu})
            })
            const data = await res.json()
            if(res.ok){
                console.log('donnée completé avec success'+data.message)
                setTelephone('')
                setLieu('')
                router.push('/client/product')
            }
        }catch(error){
            console.error('ereur:',error)
        }
    }

    return (
        <div>
            <h1 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Compléter mon profil
            </h1>
                        
            <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white mt-20 w-full max-w-md p-6 rounded-xl shadow-lg transition duration-300">
                    <h2 className="text-xl font-bold text-green-700 text-center mb-4">
                        Complétez votre profil
                    </h2>

                <form onSubmit={profileCompleted} className="space-y-4">
                    {/* Téléphone */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Numéro de téléphone
                        </label>
                        <input
                            onChange={(e)=>{setTelephone(e.target.value)}}
                            type="tel"
                            placeholder="Ex: 07 07 07 07 07"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Lieu de livraison */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Lieu de livraison
                        </label>
                        <input
                            onChange={(e)=>{setLieu(e.target.value)}}
                            type="text"
                            placeholder="Ex: Cocody, Riviera 2"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end gap-2">
                        {/* <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                        >
                            Annuler
                        </button> */}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Valider
                        </button>
                    </div>
                </form>
                </div>
            </div>

        </div>
        
    )
}