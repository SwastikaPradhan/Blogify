import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput} from '@swastikapradhan669/blogify-common';  


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success,error } = signupInput.safeParse(body);
  if (!success) {
    console.log(error);
    c.status(411);
    return c.json({
      message: "Input not correct"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        name:body.name,
        email: body.email,
        password: body.password
      }
    });
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.json({
      jwt:jwt
   })

  } catch (error) {
    return c.text('Invalid')
  }

});

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Input not correct"
    })
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "Incorrect Credits"
      })
    }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.text(jwt);

  } catch (error) {
    return c.text('Invalid')
  }

});