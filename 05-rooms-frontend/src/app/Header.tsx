import {Me} from'@/types'
import {API_URL} from "@/config";
import Link from "next/link";

const URL = API_URL + '/users/me';

export default async function Header(){
    //Call Fetch
    const response = await fetch(URL);
    console.log(response.status);

    //Extract Json
    const data = (await response.json()) as Me;

    //Logging for body
    console.log(data);

    //Render Navbar
    return (
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">ArrBnB</h1>
            <nav className="flex gap-6 text-gray-600">
                <Link href="/rooms" className="hover:text-gray-900">Rooms</Link>
                <Link href="/create" className="hover:text-gray-900">Create room</Link>
            </nav>
            <div className="flex items-center gap-3">
                <p className="text-gray-700 font-medium">{data.firstName}</p>
                <img src={data.portraitUrl} alt="User Portrait" className="w-10 h-10 rounded-full border border-gray-300" />
            </div>
        </header>
    );
}