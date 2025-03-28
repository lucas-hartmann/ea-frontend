"use client";

import { useState } from "react";
import { useActionState } from "react";

export default function SubmitForm({ action }: { action: any }) {
    const [state, formAction] = useActionState(action, { error: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-4 p-6">
            <form
                action={async (formData) => {
                    setIsSubmitting(true);
                    await formAction(formData);
                    setIsSubmitting(false);
                }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 border"
            >
                <h2 className="text-xl font-semibold text-gray-800 text-center">Add a New Listing</h2>

                {/* Display server errors */}
                {state.error && <p className="text-red-500">{state.error}</p>}
                {state.success && <p className="text-green-500">{state.success}</p>}

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    disabled={isSubmitting} // Disable inputs when submitting
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows={3}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    disabled={isSubmitting}
                ></textarea>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    disabled={isSubmitting}
                />

                <input
                    type="text"
                    name="url"
                    placeholder="Image URL"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    disabled={isSubmitting}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
