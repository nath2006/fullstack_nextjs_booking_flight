/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { redirect } from "next/navigation";
import { formSchema } from "./validation";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export interface ActionResult {
    errorTitle: string | null
    errorDesc: string[] | null
}

export async function handleSignIn(prevState: any, formData: formData): Promise<ActionResult> {
    console.log(formData.get('email'));

    const values = formSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!values.success) {
        const errorDesc = values.error.issues.map((issue) => issue.message);
        return {
            errorTitle: 'Error Validation',
            errorDesc
        };
    }

    const user = await prisma.user.findFirst({
        where: {
            email: values.data.email
        }
    });

    if (!user || !(await bcrypt.compare(values.data.password, user.password))) {
        return {
            errorTitle: "Login Failed",
            errorDesc: ['Incorrect Email or Password']
        };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return redirect('/dashboard');
}
