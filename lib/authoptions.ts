import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { AuthOptions } from "next-auth"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        // GoogleProvider({
        // clientId: process.env.GOOGLE_CLIENT_ID!,
        // clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "text" },
        },
        async authorize(credentials) {
            if (!credentials?.email) return null

            const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            })

            if (!user) return null
            return {
            id: user.id.toString(),
            name: user.name,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            lieuLivraison: user.lieuLivraison,
            }
        },
        }),
        
    ],

    callbacks: {
        // async signIn({ user }) {
        // try {
        //     const existingUser = await prisma.user.findUnique({
        //     where: { email: user.email! },
        //     })

        //     if (!existingUser) {
        //     const parts = user.name?.split(" ") ?? ["", ""]
        //     const nom = parts[0]
        //     const prenom = parts.slice(1).join(" ")
        //     await prisma.user.create({
        //         data: {
        //         name: nom,
        //         prenom: prenom,
        //         email: user.email!,
        //         telephone: "",
        //         lieuLivraison: "",
        //         },
        //     })
        //     }
        // } catch (error) {
        //     console.error("Erreur signIn:", error)
        //     return false
        // }
        // return true
        // },

        async jwt({ token }) {
            if (!token.email) return token

            const dbUser = await prisma.user.findUnique({
                where: { email: token.email },
            })
            if(dbUser?.email === process.env.ADMIN_EMAIL){
                token.role = "admin"
            }else{
                token.role = "user"
            }

            if (dbUser) {
                token.id = dbUser.id
                token.name = dbUser.name
                token.prenom = dbUser.prenom
                token.telephone = dbUser.telephone
                token.lieuLivraison = dbUser.lieuLivraison
            }

            return token
        },

        async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string
            session.user.name = token.name as string
            session.user.prenom = token.prenom as string
            session.user.email = token.email as string
            session.user.telephone = token.telephone as string
            session.user.lieuLivraison = token.lieuLivraison as string
            session.user.role = token.role as string
        }
        return session
        },
    },
    debug: true,
}