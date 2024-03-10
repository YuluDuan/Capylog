'use client'
import {useEffect, useRef} from "react";
import { Passage } from '@passageidentity/passage-js';
import {createUser} from "@/lib/api-controlers";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import { PassageElement } from '@passageidentity/passage-elements'

function Register() {
    const router = useRouter();
    const ref = useRef<PassageElement>(null);

    const onSuccess = async () =>{
        const passage = new Passage(process.env.PASSAGE_APP_ID || "");
        const user = passage.getCurrentUser();
        const userInfo = await user.userInfo();

        const newUser = {
            user_id: userInfo?.id || "",
            email: userInfo?.email || "",
            firstName: (userInfo?.user_metadata?.first_name as string) || "",
            lastName: (userInfo?.user_metadata?.last_name as string) || "",
        };

        try {
            await createUser(newUser);
            // toast.success(`user ${newUser.firstName} created`, { duration: 2000 });
            router.push('/mindshift')
        } catch (error) {
            toast.error(`"Error while creating user: ${newUser.firstName}"`);
        }
    }

    useEffect(()=>{
        require('@passageidentity/passage-elements/passage-register');
        if (ref.current) {
            ref.current.onSuccess = onSuccess;
        }
        return () => {}
    }, []);


    return (
        <div>
            <passage-register ref={ref} app-id={process.env.PASSAGE_APP_ID || ""}></passage-register>
        </div>
    );
}
export default Register;