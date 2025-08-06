export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-green-500 text-white">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg animate-pulse">Chargement...</p>
        </div>
    );
}
