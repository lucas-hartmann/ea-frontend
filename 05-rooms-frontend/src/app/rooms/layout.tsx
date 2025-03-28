import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rooms",
    description: "All the rooms",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
