"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react" // icons

    const MenuDashboard = [
    { name: "Tableau de bord", path: "/admin" },
    { name: "Produits", path: "/admin/produits" },
    { name: "Commandes", path: "/admin/commandes" },
    { name: "Clients", path: "/admin/clients" }
    ]

    const NavAdmin = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <>
        {/* Bouton pour mobile */}
        <div className="md:hidden fixed top-4 left-4 z-50">
            <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-green-700 text-white rounded-lg shadow-md"
            >
            {open ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Sidebar */}
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-6 transform transition-transform duration-300 
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
            <h1 className="mb-6 pb-2 border-b text-center text-2xl font-bold text-green-700">
            AgriVente
            </h1>

            <nav>
            <ul className="flex flex-col gap-4 md:gap-4 md:flex-col">
                {MenuDashboard.map((menu) => {
                const isActive = pathname === menu.path
                return (
                    <li key={menu.name}>
                    <Link
                        href={menu.path}
                        onClick={() => setOpen(false)} // ferme le menu sur mobile
                        className={`block px-3 py-2 rounded-md text-lg transition-all ${
                        isActive
                            ? "bg-green-100 text-green-800 font-semibold"
                            : "text-gray-800 hover:bg-green-100 hover:text-green-800"
                        }`}
                    >
                        {menu.name}
                    </Link>
                    </li>
                )
                })}
            </ul>
            </nav>
        </aside>

        {/* Menu horizontal sur mobile si fermé */}
        {!open && (
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-2 border-t">
            {MenuDashboard.map((menu) => {
                const isActive = pathname === menu.path
                return (
                <Link
                    key={menu.name}
                    href={menu.path}
                    className={`px-2 py-1 text-sm ${
                    isActive ? "text-green-700 font-semibold" : "text-gray-600"
                    }`}
                >
                    {menu.name}
                </Link>
                )
            })}
            </div>
        )}
        </>
    )
}

export default NavAdmin
