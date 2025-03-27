import {revalidatePath} from "next/cache";
import {error} from "next/dist/build/output/log";
import SubmitForm from "@/app/create/submit";

export default function CreatePage(){
    async function submit(formData: FormData) {
        'use server';

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseInt(formData.get('price')) as string;
        const url = formData.get('url') as string;
        console.log(url);

        const response = await fetch('http://localhost:3001/rooms', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
                heroUrl:
                    url,
                pricePerNight: {
                    amount: price,
                    currency: 'USD'
                }
            })
        });

        if (!response.ok){
            const data = await response.json();
            console.log(data);
           //return errors here
        }

        console.log(response.status);
        revalidatePath('/rooms');
    }

    //step 1 move form to seperate component, add use client, accept action as prop done
    //step 2 commit done
    //step 3 add useActionState (moves form data to second argument-after prevState, add form action as returned to form useActionState to form
    //step 4 verify app works
    //step 5 add pendind state (disable inputs)
    //step 6 use returned errors from server in case of !response.ok

    return(
        <SubmitForm action={submit} />
    );
}