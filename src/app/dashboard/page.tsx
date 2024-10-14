"use client";
import { useSession } from "next-auth/react";
import {
    useQuery,
} from '@tanstack/react-query'
import Guild from "@/types/guild";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.user.accessToken

    const { isPending, error, data: guilds } = useQuery({
        queryKey: ['userGuilds', accessToken],
        queryFn: async () => {
            const res = await fetch("https://discord.com/api/users/@me/guilds", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return await res.json();
        },

        enabled: !!accessToken,
    })


    if (isPending || status == "loading") {
        return <span className="flex items-center justify-center min-w-[100vw]">Loading...</span>;
    }

    if (error) return <span className="flex items-center justify-center min-w-[100vw]">An error has occurred: {error.message}</span>;

    return (
        <div className="flex flex-col items-center justify-center font-semibold m-2">
            <h1>Dashboard</h1>
            <div className="grid grid-cols-4 gap-2 m-2">
                {guilds.length > 0 ? guilds?.map((data: Guild) => (
                    <div key={data?.id} className="bg-gray-600 p-6 rounded-xl"><span>{data?.name}</span></div>
                )) : null}
            </div>
        </div>
    );
};
export default Dashboard;