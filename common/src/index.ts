import z from "zod";

export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name: z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>


export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
   
})

export type SigninInput = z.infer<typeof signupInput>


export const CreateBlogPost = z.object({
    title:z.string(),
    content:z.string()
})

export type CreateBlogPost = z.infer<typeof CreateBlogPost>

export const updateBlogPost = z.object({
    id:z.number(),
    title:z.string(),
    content:z.string()
    
})
export type updateBlogPost=z.infer<typeof updateBlogPost>