/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"
import React, {FC} from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleSignIn} from "./action";
import { useFormStatus } from "react-dom";



interface FormSignInProps{

}

const initialFormState: ActionResult = {
    errorTitle: null,
    errorDesc: []
}

const SubmitButton = () => {
    const {pending} = useFormStatus()

    return (
            <Button disabled={pending} className="w-full" type="submit">
                    {pending? 'Loading...': 'Submit'}
            </Button>
    )
}

const FormSignInPage: FC<FormSignInProps> = ({ }) =>{

    const [state, fromAction] = useActionState(handleSignIn, initialFormState);
    console.log(state)
    return(
        <div className="w-full h-screen">
            <div className="flex min-h flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold loading-9 tracking-tight text-gray-900">
                        SIgn in to your account
                    </h2>
                </div>
            </div>

            {state.errorTitle !== null && (
                <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 rounded-lg text-white">
                    <div className="font-bold mb-4">{state.errorTitle}</div>
                        <ul className="list-disc list-inside">
                            {state.errorDesc?.map((value, index)=> (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                </div>
            )}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={fromAction} className="space-y-6">
                    <Input type="email" placeholder="Email..." name="email"/>
                    <Input type="password" placeholder="password..." name="password" />
                    <SubmitButton/>
                </form>
            </div>
        </div>
    )
}

export default FormSignInPage;