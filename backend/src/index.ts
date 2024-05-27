import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', (c) => {
  return c.text('Hello signup!')
})

app.get('/api/v1/signin', (c) => {
  return c.text('Hello signin!')
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
