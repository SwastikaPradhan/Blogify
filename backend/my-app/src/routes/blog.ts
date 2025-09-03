import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {Hono} from "hono";
import { verify} from "hono/jwt";
//router configuration
export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
        
    }
    Variables:{
        userId:string;
        prisma:PrismaClient;
    }
}>();

//get all blog 
blogRouter.get('/getallposts', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        //fetch all blog
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
        //return array of blogs 
        return c.json({blogs});
    }
    catch(error){
        return c.text("error");
    }    
})

//get blog by id
blogRouter.get('/:id',async(c)=>{    
     const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    //fetch blog id
    const userid = c.req.param("id");
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
        //return single blog
        return c.json({
            blog
        });
    }catch(e) {
        console.log(e);
        c.status(411);
        return c.json({
            message:"Message while fetching blg post"
        });
    }
});

blogRouter.use("/*", async (c, next) => {
  if (c.req.method === "OPTIONS") {
    return c.text("", 204); 
  }

  const authHeader = c.req.header("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "";

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("userId", user.id as string);
    await next();
  } catch (e) {
    c.status(403);
    return c.json({ message: "Invalid or expired token" });
  }
});

//create a blog
blogRouter.post('/',async(c)=>{
    const body = await c.req.json();
     const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const authorId= c.get("userId");
    if (!authorId) {
        return c.json({ message: "User ID not found. Are you logged in?" }, 403);
    }
    try{   
        //create new blog post with title,content and authorid     
        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content: body.content,
                authorId:authorId
            }
        });
        //return blog id and authorid
        return c.json({
            id:blog.id,
            user_id:authorId
        });
        
    }
    catch(error){
        return c.text("Error Occured!");
    }  
})


//update a blog
blogRouter.put('/update/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const token= c.req.header("authorization");
    if(!token){
        return c.json({
            msg:"Authentication token is missing"
        });
    }
    let userId;
    try{
        const decoded=await verify(token,c.env.JWT_SECRET);
        userId=decoded.id;
    }catch(e){
        return c.json({
            msg:"invalid or expired token"
        });
    }

    const postId=c.req.param("id");
    try{
        const post=await prisma.blog.findUnique({
            where:{
                id:postId
            }
        });
        if(!post){
            return c.json({
                msg:"Post not found"
            });
        }
        if(post.authorId !== userId){
            return c.json({
                msg:"User not authorized to update this post"
            });
        }

        //parse the request body
        const {title,content}=await c.req.json();

        await prisma.blog.update({
            where:{
                id:postId
            },  
            data:{
                title:title || post.title,
                content:content || post.content
            }
            
        });
        return c.json({
            message:"Successfully updated post"
        });

    }catch(e){
        console.log(e);
        return c.json({
            msg:"Failed to update post"
        })
    }
})
export default blogRouter;

//delete blog by id
blogRouter.delete("/delete/:id",async(c)=>{
     const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
      const userId = c.req.param("id");
    //check if post exists
    const postId= await c.req.param("id");
    try{
        const post = await prisma.blog.findUnique({
            where:{
                id:postId
            }
        });
        if(!post){
            return c.json({msg:"Post not found"});
        }
        if(post.authorId != userId){
            return c.json({mesg:"User not authorized to delete this post"})
        }
       
        await prisma.blog.delete({
            where:{
                id: postId
            }
        });
        return c.json({
            message:"Successfully deleted the post"
        });
    }catch(e){
        return c.json({msg:"Failed to delete post"});
    }
})
