"use client"
import Image from "next/image";
import Apropos from "./components/Apropos";
import Contact from "./components/Contact";
import Nav from "./components/navBar";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
    return (
      <> 
      <Nav/>  
      <section className="relative min-h-screen w-full  bg-cover bg-center flex items-center justify-center">
        {/* Overlay sombre */}
        {/* <div className="absolute inset-0 bg-opacity-50 z-0" /> */}

        <div className="relative flex flex-col md:flex-row items-center justify-between w-full h-full px-6 md:px-16 gap-10">
          
          {/* Texte principal */}
          <div className="max-w-xl text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-600 leading-tight drop-shadow-md ">
              Le goût vrai des tubercules
            </h1>
            <p className="text-xl md:text-2xl text-orange-300 font-medium">
              100% naturels, 100% locaux
            </p>
            <Link href="/client/product" className="mt-4 px-6 py-3 text-white text-lg font-semibold bg-orange-600 hover:bg-orange-500 rounded-xl shadow-lg transition duration-300 ease-in-out">
              Voir nos produits
            </Link>
          </div>

          {/* Image de présentation */}
          <div className="flex items-center justify-center">
            <Image
              src="/image/1.png"
              alt="Image de manioc"
              width={260}
              height={260}
              className="rounded-full border-4 border-white shadow-xl bg-white/60 hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </section>
      <Apropos/>
      <Contact/>
      </>    
  );
}  
