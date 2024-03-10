'use client'

import {useEffect, useRef} from "react";
import { PassageElement } from '@passageidentity/passage-elements'

function Login() {
    const ref = useRef<PassageElement>(null);

    useEffect(()=>{
        require('@passageidentity/passage-elements/passage-login');
        if (ref.current) {
            ref.current.beforeAuth = beforeAuth;
        }
        return () => {}
    }, []);

    const beforeAuth = (email: string) =>{
        console.log({email});
        return true;
    }

    return (
        <div>
            <passage-login ref={ref} app-id={process.env.PASSAGE_APP_ID}></passage-login>
        </div>
    );
}
export default Login;