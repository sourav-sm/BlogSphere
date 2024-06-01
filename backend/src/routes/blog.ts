import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string;
    }
}>();

//AUTH VERICATION ENDPOINT
blogRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header("authorization")||"";
    const user=await verify(authHeader,c.env.JWT_SECRET);//it must be verify not decode as decoding can be done by anyone but verify should be done by that the user only
    if(user){
        c.set("userId",user.id);
        await next();//it will transfer the user to next route if the token is correct
    }
    else{
        c.status(403);
        return c.json({
            message:"you are not logged in"
        })
    }
   await next();
})

//FOR POSTING OR CREATRING A NEW END POINT
blogRouter.post('/', async(c) => {
    const body=await c.req.json();
    const userId=c.get("userId");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
      const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:3//came from blog router after authentication
        }
    })
    
    return c.json({
        id:blog.id
    })  
    } catch (error) {
        console.log(error)
    }
    
})
  
//END POINT FOR UPDATING BLOG
//put router needs to update title and content
blogRouter.put('/',async (c) => {
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

//END POINT FOR GETTING A SINGLE PARTICULAR BLOG
blogRouter.get('/', async(c) => {
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
  
//END POINT FOR GETTING ALL THE BLOGS
blogRouter.get('/bulk', async(c) => {
   const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
   }).$extends(withAccelerate())

   const blogs=await prisma.blog.findMany();
  return c.json({
    blogs
  })
})