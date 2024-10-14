import NextAuth from "next-auth"
import DiscordProvider from 'next-auth/providers/discord'

/*
fetch('https://discord.com/api/oauth2/token/revoke', {
                    method  : 'POST',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    body    : new URLSearchParams({
                        client_id     : '############',
                        client_secret : '##################3',
                        grant_type    : 'refresh_token',
                        refresh_token : res.refresh_token
                    })
                });
*/

const handler = NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: { params: { scope: "identify guilds email" } },
            async profile(profile) {
                return {
                    id: profile.id,
                    username: profile.username,
                    globalName: profile.global_name,
                    avatar: profile.avatar,
                    email: profile.email,
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            return { ...token, ...user, ...account }
        },
        async session({ session, token }) {

            session.user = {
                id: token.id as string,
                email: token.email as string,
                username: token.username as string,
                globalName: token.globalName as string,
                avatar: token.avatar as string,
                tokenType: token.token_type as string,
                accessToken: token.access_token as string,
                expiresAt: token.expires_at as number,
                refreshToken: token.refresh_token as string,
            };

            return session;
        },

    },
})

export { handler as GET, handler as POST }