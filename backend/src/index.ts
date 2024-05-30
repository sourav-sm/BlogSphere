import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from 'hono/jwt'



const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()

app.get('/', (c) => {
  
 
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async(c) => {
  const body=await c.req.json();
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
  c.status(411);
  return c.text('Invalid')
 }
})

app.get('/api/v1/user/signin', async(c) => {
  const body=await c.req.json()
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

app.get('/api/v1/blog', (c) => {
  return c.text('Hello blog!')
})

app.get('/api/v1/blog/:id', (c) => {
  const id=c.req.param('id')
  console.log(id);
  return c.text('get blog route')
})

export default app

//postgresql://developersourav135:GDWbeuk6ZPv0@ep-royal-bread-48297123.us-east-2.aws.neon.tech/nextjs?sslmode=require
//the above postgress url will be use in .env file as a DATABASE_URL


//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDM4MzVhZjUtNTc3Ni00MTcxLWExYWYtZjRjYjViZDU1YThhIiwidGVuYW50X2lkIjoiNWEwZjJiZGY4OWUyZGMzN2Q4OGQ4ZjkzZWI5MzFhZjJhMjM2NmMyZmUyOTA1ZmRkZTMwMWVjMGQ4MDNkNWY1YSIsImludGVybmFsX3NlY3JldCI6ImRjZmQwYjgxLTI5NWEtNDU1MC1hNjcwLTgzMmUzOTg0ZTU4MiJ9.gU1L55OYGC-sFJ2CyndbkCwJkEcazy3BGgiujyeD4yg"

//the above prisma url will be use in wrangler.toml file as a DATABASE_URL