import { revalidatePath } from "next/cache";
import SubmitForm from "@/app/create/submit";
import {redirect} from "next/navigation";

export default function CreatePage() {
    async function submit(prevState: any, formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = parseInt(formData.get("price") as string);
        const url = formData.get("url") as string;

        console.log(url);

        const response = await fetch("http://localhost:3001/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                heroUrl: url,
                pricePerNight: {
                    amount: price,
                    currency: "USD",
                },
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data);
            return { error: data.message || "Failed to create room."  };
        }

        console.log(response.status);
        redirect("/rooms");
    }

    return <SubmitForm action={submit} />;
}
