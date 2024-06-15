import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
//import { signupInput } from '../../../common/src/zod'
import { signupInput,signinInput } from '@100xdevs/medium-common'

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

userRouter.post('/signup', async(c) => {
    const body=await c.req.json();
    //zod validation check
    const { success }=signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not Correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
   try{
    const user=await prisma.user.create({
      data:{
        username:body.username,
        password:body.password,
        name:body.name
      }
     })
     const jwt=await sign({
      id:user.id
     },c.env.JWT_SECRET)
      
      return c.text(jwt)
   }catch(e){
    console.log(e);
    c.status(411);
    return c.text('Invalid')
   }
  })
  
  userRouter.post('/signin', async(c) => {
    const body=await c.req.json();
    //zod validation check
    const { success }=signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not Correct"
      })
    }
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
      const user=await prisma.user.findFirst({
        where:{
          username:body.username,
          password:body.password,
        }
      })
      //if user not found
      if(!user){
        c.status(403);
        return c.json({
          message:"Incorrect Credentials"
        })
      } 
      const jwt=await sign({
        id:user.id
      },c.env.JWT_SECRET);
  
      return c.text(jwt)
    }catch(e){
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  })