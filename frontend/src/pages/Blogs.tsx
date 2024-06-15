import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/Index"
import { BlogSkeleton } from "../components/BlogSkeleton";



export const  Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    
    return <div>
        <Appbar/>
    <div className="flex justify-center">
              <div className="max-w-xl">
                {blogs.map(blog=><BlogCard
                      id={blog.id}
                      authorName={blog.author.name || "Annonumous"}
                      title={blog.title}
                      content={blog.content}
                      publishedDate={"21st nov 2002"}
                  />)}
              </div>
            </div> 
    </div>
}