import React from 'react'

const Contact= () => {
  return (
            <section className="min-h-screen flex justify-center px-6 py-20 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start  ">
            
            {/* Formulaire de contact */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Envoyez-nous un message</h2>
            <form className="space-y-5">
                <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                    placeholder="Écrivez votre message ici..."
                    rows={5}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
                </div>
                <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
                >
                Envoyer
                </button>
            </form>
            </div>

            {/* Informations de contact */}
            <div className="p-6">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Nos coordonnées</h2>
            <ul className="space-y-4 text-lg">
                <li>
                <strong>Adresse :</strong> Abidjan, Abobote
                </li>
                <li>
                <strong>Téléphone :</strong> <a href="tel:+2250102030405" className="text-orange-600">+225 01 02 03 04 05</a>
                </li>
                {/* <li>
                <strong>Email :</strong> <a href="mailto:contact@monsite.com" className="text-orange-600">contact@monsite.com</a>
                </li> */}
                <li>
                <strong>Heures d'ouverture :</strong> Lundi - Samedi : 08h - 18h
                </li>
                <li>
                <strong>Réseaux sociaux :</strong>
                <div className="flex gap-4 mt-2">
                    <a href="#" className="text-orange-600 hover:underline">Facebook</a>
                    {/* <a href="#" className="text-orange-600 hover:underline">Instagram</a> */}
                    <a href="#" className="text-orange-600 hover:underline">Whastapp</a>
                </div>
                </li>
            </ul>
            </div>

        </div>
        </section>
  )
}

export default Contact