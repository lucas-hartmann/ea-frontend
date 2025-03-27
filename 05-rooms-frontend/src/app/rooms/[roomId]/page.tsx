'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/config";
import { Room } from "@/types";
import Link from "next/link";

export default function RoomDetail() {
    const { roomId } = useParams();
    const [room, setRoom] = useState<Room | null>(null);

    useEffect(() => {
        if (!roomId) return; // Ensure roomId is available before fetching
        fetch(`${API_URL}/rooms/${roomId}`)
            .then((res) => res.json())
            .then((data: Room) => setRoom(data));
    }, [roomId]);

    if (!room) return <p className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4 p-6">Loading...</p>;
    console.log(room);


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4 p-6">

        <div className="w-full max-w-md mb-4">
                <Link href="/rooms" className="text-gray-600 hover:text-gray-900 text-sm">
                    ← Back to Rooms
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border max-w-md w-full">
                <img src={room.heroUrl} alt={room.title} className="w-full h-56 object-cover" />

                <div className="p-6">
                    <h1 className="text-xl font-semibold text-gray-800">{room.title}</h1>
                    <p className="text-gray-600 mt-2">{room.description}</p>

                    <p className="text-gray-500 text-sm mt-4">Added on {new Date(room.createdAt).toISOString().split("T")[0]}</p>

                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                        <span className="text-blue-600 font-bold">{room.pricePerNight.amount} {room.pricePerNight.currency}/day</span>

                        <div className="flex items-center gap-2">
                            <img src={room.owner.portraitUrl} alt={room.owner.firstName} className="w-8 h-8 rounded-full border" />
                            <span className="text-gray-700 font-medium">{room.owner.firstName} {room.owner.lastName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
