import React, { useState } from 'react'
import toast from 'react-hot-toast'

function CommandCard({ commande }) {
    const [viewDetail, setviewDetail] = useState(false)
    const [livree, setLivree] = useState(commande.status || false) // état initial selon DB
    const [loading, setLoading] = useState(false)

        const handleLivree = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/commande/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                id: commande.id,  // ✅ Inclure l'ID
                livree: true      // ✅ Nouveau statut
            }),
            })

            const data = await res.json()

            if (!res.ok) {
            toast.error(data.message || "Erreur lors de la mise à jour")
            return
            }

            setLivree(true)
            toast.success("Commande marquée comme livrée ✅")
        } catch (error) {
            console.error(error)
            toast.error("Erreur serveur")
        } finally {
            setLoading(false)
        }
        }


    return (
        <div className="space-y-4">
            <div
                key={commande.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
            >
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-green-700">
                        Commande #{commande.id}
                    </h2>
                    <span className="text-gray-500 text-sm">
                        {new Date(commande.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <div className="mt-3">
                    <p className="text-gray-800 font-medium">
                        {commande.user.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                        📞 {commande.user.telephone}
                    </p>
                    <p className="text-gray-600 text-sm">
                        📍 {commande.user.lieuLivraison}
                    </p>
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <p className="font-bold text-green-700">
                        Total : {commande.total.toLocaleString()} FCFA
                    </p>
                    <button
                        onClick={() => setviewDetail(!viewDetail)}
                        className="text-green-600 hover:text-green-800 font-medium underline text-sm"
                    >
                        {viewDetail ? "Fermer" : "Voir détails"}
                    </button>
                </div>

                {viewDetail && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Détails de la commande 
                        </h3>
                        {commande.items.map((item, index) => (
                            <div key={index} className="flex justify-between border-b py-2 text-sm">
                                <span><b>{item.product.name}</b></span>
                                <span>Qté : {item.quantity}</span>
                                <span>{item.price.toLocaleString()} FCFA</span>
                            </div>
                        ))}

                        {/* Bouton Commande Livrée */}
                        <div className="mt-4 flex justify-end">
                            <button
                                disabled={livree || loading}
                                onClick={handleLivree}
                                className={`px-4 py-2 rounded-lg text-white font-medium transition
                                    ${livree ? "bg-green-500" : "bg-orange-500 hover:bg-orange-600"}
                                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                {livree ? "Livrée ✅" : loading ? "En cours..." : "Marquer livrée"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommandCard
