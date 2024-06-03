import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@100xdevs/medium-common";


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
    try {
        const authHeader=c.req.header("authorization")||"";
    const user=await verify(authHeader,c.env.JWT_SECRET);//it must be verify not decode as decoding can be done by anyone but verify should be done by that the user only
    if(user){
        c.set("userId",user.id);
    }
    else{
        c.status(403);
        return c.json({
            message:"you are not logged in"
        })
    }
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({
            message:"you are not logged in"
        })
    }
   await next();//it will transfer the user to next route if the token is correct
})

//FOR POSTING OR CREATRING A NEW END POINT
blogRouter.post('/', async(c) => {
    const body=await c.req.json();
    //zod validation check
    const { success }=createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not Correct"
      })
    }

    const userId=c.get("userId");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
      const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(userId)//came from blog router after authentication
            //HERE 
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
    //zod validation check
    const { success }=updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not Correct"
      })
    }
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
//it is importtant to place blogs route at the top of specific id wise route otherwise it is also return the previous route
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

//END POINT FOR GETTING A SINGLE PARTICULAR BLOG
blogRouter.get('/:id', async(c) => {
    const postid=await c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog=await prisma.blog.findFirst({
            where:{
                id:Number(postid)
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
  
