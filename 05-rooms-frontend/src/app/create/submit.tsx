'use client';
export default function SubmitForm(props){
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4 p-6">

            <form action={props.action} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 border">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Add a New Listing</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                ></textarea>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />

                <input
                    type="text"
                    name="url"
                    placeholder="Image URL"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}