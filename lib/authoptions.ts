    // pages/api/auth/[...nextauth].ts
    import NextAuth from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";
    import prisma from "./prisma";

    export default NextAuth({
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

            // Retourne un objet utilisateur minimal
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
        // Au premier login, user est défini
        if (user) {
            token.id = user.id;
            token.name = user.name;
            token.prenom = user.prenom;
            token.email = user.email;
        }
        return token;
        },
        async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.prenom = typeof token.prenom === "string" ? token.prenom : undefined;
            session.user.email = token.email;
        }
        return session;
        },
    },
    debug: true,
});
