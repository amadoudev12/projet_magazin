import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
        interface User {
        telephone?: string | null;
        lieuLivraison?: string | null;
        }
    interface Session {
        user: {
        id: number | string;
        name?: string | null;
        prenom?: string | null;
        email?: string | null;
        image?: string | null;
        telephone? :  String | null;
        lieuLivraison? : String | null;
        role? : String | null;
        };
    }

    interface User extends DefaultUser {
        id: string;
    }
    }

    declare module "next-auth/jwt" {
    interface JWT {
        id: number | string;
        email?: string | null;
        name?: string | null;
        telephone? :  String | null;
        lieuLivraison? : String | null;
        role? : String | null;
    }
}
