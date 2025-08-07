"use client"
import Image from "next/image";
import Apropos from "./components/Apropos";
import Contact from "./components/Contact";
import Nav from "./components/navBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { status} = useSession()
  const router = useRouter()
  // const isAuthenticated = status === "authenticated";
    // useEffect(() => {
    //   if (status !== "unauthenticated") {
    //     router.push("/client/login");
    //   }
    // }, [status, router]);

    if (status === "loading") {
      // Optionnel : spinner ou écran de chargement
      return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 via-white to-green-50">
        {/* Spinner animé */}
        <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>

        {/* Texte animé */}
        <p className="mt-6 text-lg font-semibold text-green-700 animate-pulse">
          Chargement en cours...
        </p>
      </div>
    );
    }

    if (status === "unauthenticated") {
      return null; // Évite de rendre la page avant la redirection
    }

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
