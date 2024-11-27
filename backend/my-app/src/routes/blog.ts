import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {Hono} from "hono";
import { verify} from "hono/jwt";
import { CreateBlogPost,updateBlogPost } from "@swastikap/blogify-common";
export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
       
    }
    Variables:{
        userId:string;
    }
}>();

blogRouter.get('/getallposts', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blogs = await prisma.blog.findMany({
            select :{
                content: true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
          
        });
        return c.json({blogs});

    }
    catch(error){
        return c.text("error");
    }
    
    

})

blogRouter.use("/*",async(c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user= await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set('userId', user.id as string);
        await next();

    }else{
        c.status(403);
        return c.json({
            message:"You are not logged in!"
        })
    }
})
blogRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    

    try{       
        const authorId= c.get("userId");
        const body = await c.req.json();
        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content: body.content,
                authorId:authorId 
            }
        });
        return c.json({
            id:blog.id,
            user_id:authorId
        });
    }
    catch(error){
        return c.text("Error Occured!");
    }  
})

blogRouter.put('/',async(c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
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


blogRouter.get('/:id',async(c)=>{
    const userid = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:userid
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return c.json({
            blog
        });
    }catch(e) {

        c.status(411);
        return c.json({
            message:"Message while fetching blg post"
        });
    }
});


export default blogRouter;