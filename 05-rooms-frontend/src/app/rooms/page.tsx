"use client";
import { API_URL } from "@/config";
import { Collection, Room, PageInfo } from "@/types";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Pagination from "@/app/components/Pagination";


const URL = API_URL + "/rooms?size=9";

export default function RoomsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const initialQuery = searchParams.get("query") || "";

    const [rooms, setRooms] = useState<Collection<Room> | null>(null);
    const [page, setPage] = useState<number>(initialPage);
    const [query] = useState<string>(initialQuery);

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch(
                `${URL}&page=${page - 1}&query=${query ? query : ""}`
            );
            const data = await response.json();
            setRooms(data);
        };

        fetchRooms();
    }, [page, query]);

    if (!rooms) {
        return <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4 p-6 text-black">
            Loading...
        </div>
            ;
    }

    const totalPages = Math.ceil(rooms.page.totalElements / 9);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            router.push(`?page=${newPage}&query=${query}`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {rooms.nodes.map((room) => {
                    const formattedDate = new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(new Date(room.createdAt));

                    return (
                        <Link href={`/rooms/${room.id}`} key={room.id}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden border flex flex-col h-full">
                                <img
                                    src={room.heroUrl}
                                    alt="Room Image"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                                        {room.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm flex-grow">
                                        {room.description}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-2">Added on {formattedDate}</p>
                                    <div className="mt-auto pt-3 border-t flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      {room.pricePerNight.amount} {room.pricePerNight.currency}/day
                    </span>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={room.owner.portraitUrl}
                                                alt={room.owner.firstName}
                                                className="w-6 h-6 rounded-full border"
                                            />
                                            <span className="text-gray-700 text-sm">{room.owner.firstName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="flex flex-col items-center mt-8">
                <Pagination page={rooms.page} />
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                        className={`px-4 py-2 rounded-lg transition font-medium ${
                            page > 1
                                ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                                : "bg-neutral-500 text-neutral-400 cursor-not-allowed"
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 rounded-lg transition font-medium ${
                            page < totalPages
                                ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                                : "bg-neutral-500 text-neutral-400 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
