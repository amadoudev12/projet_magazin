import React from 'react'

const ClientCard = ({ client }) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg text-green-700">
                    Client#{client.id}
                </h2>
            </div>

            <div className="mt-3">
                <p className="text-gray-800 font-medium">
                    👤 {client.name} {client.prenom}
                </p>
                <p className="text-gray-600 text-sm">
                    📞 {client.telephone}
                </p>
                <p className="text-gray-600 text-sm">
                    📍 {client.lieuLivraison}
                </p>
            </div>
        </div>
    )
}

export default ClientCard
