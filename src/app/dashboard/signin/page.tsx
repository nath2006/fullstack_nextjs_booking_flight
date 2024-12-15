/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Metadata } from "next";
import React, {FC} from "react";
import FormSignInPage from "./form";

interface SignInPageProps{

}

export const metadata: Metadata = {
    title: "Dashboard | Sign In"
}


const SignInPage: FC<SignInPageProps> = ({ }) =>{

    return(
     <FormSignInPage/>
    )
}

export default SignInPage;