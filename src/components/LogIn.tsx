'use client'

import {useEffect, useRef} from "react";
function Login() {
    const ref = useRef();

    useEffect(()=>{
        require('@passageidentity/passage-elements/passage-login');
        const {current} = ref;
        current.beforeAuth = beforeAuth;
        return () => {}
    }, []);

    const beforeAuth = (email) =>{
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