'use server';
import {Collection, Room} from '@/types'
import {API_URL} from "@/config";
import Link from "next/link";

const URL = API_URL + '/rooms?size=9';

export default async function RoomsPage(){
    //Call Fetch
    const response = await fetch(URL);
    console.log(response.status);
    const data = (await response.json()) as Collection<Room>;

    console.log(data);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.nodes.map((room) => (
                    <Link href={`/rooms/${room.id}`} key={room.id}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden border flex flex-col h-full">
                        <img src={room.heroUrl} alt="Room Image" className="w-full h-48 object-cover" />
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-semibold text-gray-800 truncate">{room.title}</h2>
                            <p className="text-gray-600 text-sm flex-grow">{room.description}</p>
                            <p className="text-gray-500 text-xs mt-2">Added on {new Date(room.createdAt).toISOString().split("T")[0]}</p>
                            <div className="mt-auto pt-3 border-t flex justify-between items-center">
                                <span className="text-blue-600 font-bold">{room.pricePerNight.amount} {room.pricePerNight.currency}/day</span>
                                <div className="flex items-center gap-2">
                                    <img src={room.owner.portraitUrl} alt={room.owner.firstName} className="w-6 h-6 rounded-full border" />
                                    <span className="text-gray-700 text-sm">{room.owner.firstName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}