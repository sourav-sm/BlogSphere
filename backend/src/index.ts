import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';



const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

app.get('/', (c) => {
  
 
  return c.text('Hello Hono!')
})


export default app

//postgresql://developersourav135:GDWbeuk6ZPv0@ep-royal-bread-48297123.us-east-2.aws.neon.tech/nextjs?sslmode=require
//the above postgress url will be use in .env file as a DATABASE_URL


//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDM4MzVhZjUtNTc3Ni00MTcxLWExYWYtZjRjYjViZDU1YThhIiwidGVuYW50X2lkIjoiNWEwZjJiZGY4OWUyZGMzN2Q4OGQ4ZjkzZWI5MzFhZjJhMjM2NmMyZmUyOTA1ZmRkZTMwMWVjMGQ4MDNkNWY1YSIsImludGVybmFsX3NlY3JldCI6ImRjZmQwYjgxLTI5NWEtNDU1MC1hNjcwLTgzMmUzOTg0ZTU4MiJ9.gU1L55OYGC-sFJ2CyndbkCwJkEcazy3BGgiujyeD4yg"

//the above prisma url will be use in wrangler.toml file as a DATABASE_URL