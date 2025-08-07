"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaHome, FaAddressBook, FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const MenuItems = [
    {
        name: "Acceuil",
        path: "/",
        icon: FaHome
    },
    {
        name: "A propos",
        path: "../client/apropos",
        icon: FaAddressBook
    },
    {
        name: "Boutique",
        path: "../client/product",
        icon: MdProductionQuantityLimits
    },
    {
        name: "Contact",
        path: "../client/contact",
        icon: IoMdContact
    }
]

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()

    const {data:session , status} = useSession()
    
    const isAuthenticated = status === "authenticated";
    const admin = session?.user?.role === "admin"

    return (
    <nav className="px-6 py-4 shadow-md bg-white w-full fixed top-0 left-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
            
            {/* Logo */}
            <h1 className="text-2xl font-extrabold text-orange-600 tracking-wide">Daloa ~ Kalifa</h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-10">
            {MenuItems.map((item) => {
                const isactive = pathname === item.path;
                return (
                <li key={item.name}>
                    <Link
                    href={item.path}
                    className={`flex items-center gap-2 transition duration-300 ${
                        isactive ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
                    }`}
                    >
                    <item.icon className="text-xl" />
                    <span className="font-medium">{item.name}</span>
                    </Link>
                </li>
                );
            })}
                        {isAuthenticated && (
                <div className="mt-4 flex justify-end pr-6 space-x-3">
                {/* Bouton Déconnexion */}
                <button
                    onClick={() => signOut()}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                    Déconnexion
                </button>

                {/* Lien Admin visible seulement pour l'admin */}
                {admin && (
                    <Link
                    href="/admin"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                    Tableau de bord
                    </Link>
                )}
                </div>

            )}
            </ul>

            {/* Panier */}
            {/* Menu Mobile Icon */}
            <div
                className="md:hidden text-2xl text-orange-600 cursor-pointer transition hover:scale-110"
                onClick={() => setMenuOpen(!menuOpen)}
                >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
            <ul className="md:hidden mt-3 flex flex-col gap-4 bg-white px-6 py-4 shadow-lg rounded-lg animate-slideDown">
                {MenuItems.map((item) => (
                    <li key={item.name}>
                    <Link
                        href={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-gray-800 hover:text-orange-600 transition duration-300"
                    >
                        <item.icon className="text-xl" />
                        <span className="text-lg font-medium">{item.name}</span>
                    </Link>
                    </li>
                ))}
            <li>
                <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-800 hover:text-orange-600 transition duration-300"
                >
                <FaCartArrowDown className="text-xl" />
                <span className="text-lg font-medium">Panier</span>
                </Link>
            </li>
                        {isAuthenticated && (
                <div className="mt-4 flex justify-end pr-6 space-x-3">
                {/* Bouton Déconnexion */}
                <button
                    onClick={() => signOut()}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                    Déconnexion
                </button>

                {/* Lien Admin visible seulement pour l'admin */}
                {admin && (
                    <Link
                    href="/admin"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                    Tableau de bord
                    </Link>
                )}
                </div>

            )}
            </ul>
        )}
    </nav>
    )
}
export default Nav