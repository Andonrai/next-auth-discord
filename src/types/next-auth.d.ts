import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            globalName: string;
            avatar: string;
            email: string;
            tokenType: string;
            accessToken: string;
            expiresAt: number;
            refreshToken: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            username: string;
            globalName: string;
            avatar: string;
            email: string;
            tokenType: string;
            accessToken: string;
            expiresAt: number;
            refreshToken: string;
        };
    }
}