import {z} from "zod";

export const formSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({message: 'Invalid email address'}),
    password: z.string({required_error: "Password is required"}).min(5, {message:'Password must be at least 5 characters long'} )
})