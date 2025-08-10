import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
    const token = req.nextauth.token

        // Si l'utilisateur n'est pas admin, on redirige vers une page personnalisée
        if (token?.role !== "admin") {
            return NextResponse.redirect(new URL("/client/product", req.url))
        }

        // Sinon, on laisse passer
        return NextResponse.next()
    },
    {
        callbacks: {
        authorized: ()=>true
        },
    }
)

export const config = { 
  matcher: ["/admin/:path*"] // Protége toutes les pages admin
}
