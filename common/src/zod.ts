import z from "zod";

//for backend
//signup zod validarion
export const signupInput=z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

//signin zod
export const signinInput=z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

//create blog validation
export const createBlogInput=z.object({
    title:z.string(),
    content:z.string()
})

//update blog post
export const updateBlogInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
})


//type inference in zod validarion
//mainly for frontend so that we know the type
export type SignupInput=z.infer<typeof signupInput>
export type SigninInput=z.infer<typeof signinInput>
export type CreateBlogInput=z.infer<typeof createBlogInput>
export type UpdateBlogInput=z.infer<typeof updateBlogInput>