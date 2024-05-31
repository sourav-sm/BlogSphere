import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,

    }
}>();

blogRouter.use("/*",(c,next)=>{
    //extract the user id
    //pass it down to the route handler
    next();
})

blogRouter.post('/api/v1/blog', async(c) => {
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:1//came from blog router after authentication
        }
    })
    
    return c.json({
        id:blog.id
    })
})
  
//put router needs to update title and content
blogRouter.put('/api/v1/blog',async (c) => {
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog=await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

  return c.json({
    id:blog.id
  })
})

blogRouter.get('/api/v1/blog', async(c) => {
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog=await prisma.blog.findFirst({
            where:{
                id:body.id
            },
        })
        return c.json({
            blog
        });
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        });
    }


})
  
blogRouter.get('/bulk', async(c) => {
   const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
   }).$extends(withAccelerate())

   const blogs=await prisma.blog.findMany();
  return c.json({
    blogs
  })
})