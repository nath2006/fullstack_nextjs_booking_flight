/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Metadata } from "next";
import React, {FC} from "react";


interface DashboardProps{

}

export const metadata: Metadata = {
    title: "Dashboard | Home"
}


const SignInPage: FC<DashboardProps> = ({ }) =>{

    return(
     <div>
        Dashboard
     </div>
    )
}

export default SignInPage;