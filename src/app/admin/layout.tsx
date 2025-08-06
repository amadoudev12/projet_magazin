import NavAdmin from "../components/NavAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
        {/* Navigation à gauche */}
        <div className="md:block w-64">
            <NavAdmin />
        </div>

        {/* Contenu à droite */}
        <main className="flex-1 p-5 w-full">
            {children}
        </main>
        </div>
    );
}
