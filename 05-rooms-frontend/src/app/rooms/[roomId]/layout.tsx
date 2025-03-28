import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Room details",
    description: "The room details",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
