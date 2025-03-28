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
        if (!roomId) return;
        fetch(`${API_URL}/rooms/${roomId}`)
            .then((res) => res.json())
            .then((data: Room) => setRoom(data));
    }, [roomId]);

    if (!room) return <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4 p-6 text-black">
        Loading...
    </div>;
    console.log(room);


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-6 p-4">

            <div className="w-full max-w-4xl px-4 mb-4">
                <Link href="/rooms" className="text-gray-600 hover:text-gray-900 text-sm">
                    ← Back to Rooms
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border w-full max-w-4xl">

                <div className="w-full h-80 md:h-[450px] overflow-hidden">
                    <img src={room.heroUrl} alt={room.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">{room.title}</h1>
                    <p className="text-gray-600">{room.description}</p>

                    <div className="border-t pt-4 flex flex-col gap-3">
                        <p className="text-gray-500 text-sm">Added on {new Date(room.createdAt).toISOString().split("T")[0]}</p>

                        <div className="flex justify-between items-center">
              <span className="text-xl text-blue-600 font-bold">
                {room.pricePerNight.amount} {room.pricePerNight.currency}/night
              </span>

                            <div className="flex items-center gap-3">
                                <img
                                    src={room.owner.portraitUrl}
                                    alt={room.owner.firstName}
                                    className="w-10 h-10 rounded-full border"
                                />
                                <span className="text-gray-700 font-medium">
                  {room.owner.firstName} {room.owner.lastName}
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
