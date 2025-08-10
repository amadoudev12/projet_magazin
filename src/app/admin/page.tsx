import { BsCart } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import prisma from "../../../lib/prisma";

export const dynamic = 'force-dynamic';  // <<< Ajout ici

export default async function AdminPage(){
    const nombreCommande = await prisma.order.count();
    const ChiffreAffaire = await prisma.order.aggregate({
        _sum:{
            total:true
        }
    });
    const nombreClient = await prisma.user.count();
    
    return (
        <div>
            <div className="flex flex-col justify-center mb-4">
                <h1 className="font-bold text-3xl py-2">Tableau de Bord</h1>
                <p className="text-gray-500">Aperçu de vos ventes de produits agricoles</p>
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center">
                {/* Carte 1 */}
                <div className="border-2 border-gray-200 bg-white p-7 w-64 rounded-xl shadow-lg hover:shadow-2xl transition">
                    <div className="mb-3 flex gap-6 items-center">
                        <p className="text-gray-600 font-medium">Chiffres d&apos;affaires</p>
                        <TbMoneybag className="text-blue-500 text-xl font-bold"/>
                        <p className="text-green-500 text-xl font-bold"></p>
                    </div>
                    <h2 className="font-bold text-3xl text-gray-800">{ChiffreAffaire._sum.total} FCFA</h2>
                </div>

                {/* Carte 2 */}
                <div className="border-2 border-gray-200 bg-white p-7 w-64 rounded-xl shadow-lg hover:shadow-2xl transition">
                    <div className="mb-3 flex gap-6 items-center">
                        <p className="text-gray-600 font-medium">Les Commandes</p>
                        <BsCart className="text-blue-500 text-xl font-bold"/>
                    </div>
                    <h2 className="font-bold text-3xl text-gray-800">{nombreCommande}</h2>
                </div>

                {/* Carte 3 */}
                <div className="border-2 border-gray-200 bg-white p-7 w-64 rounded-xl shadow-lg hover:shadow-2xl transition">
                    <div className="mb-3 flex gap-6 items-center">
                        <p className="text-gray-600 font-medium"> Vos Clients</p>
                        <FaUsers className="text-blue-500 text-xl font-bold"/>
                    </div>
                    <h2 className="font-bold text-3xl text-gray-800">{nombreClient}</h2>
                </div>
            </div>
        </div>
    )
}
