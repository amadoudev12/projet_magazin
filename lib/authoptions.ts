import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../lib/prisma"; // ajuste le chemin selon ton projet

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "exemple@mail.com" },
        },
        async authorize(credentials) {
            try {
            if (!credentials?.email) return null;

            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
            });

            if (!user) return null;

            return {
                id: user.id.toString(),
                name: user.name,
                prenom: user.prenom,
                email: user.email,
            };
            } catch (error) {
            console.error("Authorize error:", error);
            return null;
            }
        },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.name = user.name;
            token.prenom = user.prenom;
            token.email = user.email;
            if(user.email === process.env.ADMIN_EMAIL){
                token.role = "admin"
            }else{
                token.role = "client"
            }
        }
        return token;
        },
        async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.prenom = typeof token.prenom === "string" ? token.prenom : undefined;
            session.user.email = token.email;
            session.user.role = token.role
        }
        return session;
        },
    },
    debug: true,
    };

export default authOptions;
