import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create rooms",
    description: "You can create a room here...",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
