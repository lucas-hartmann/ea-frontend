import Link from 'next/link';
import notFoundImage from "@/app/images/404.jpg";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
                <h1 className="text-4xl font-bold text-red-600 mb-6">404 - Page Not Found</h1>

                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                    <img
                        src={notFoundImage.src} // Use .src for imported images
                        alt="Page not found illustration"
                        className="w-full h-64 object-cover"
                        width={500}
                        height={300}
                    />
                </div>

                <p className="text-lg text-gray-700 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    href="/rooms/page"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Back to Rooms
                </Link>
            </div>
        </div>
    );
}