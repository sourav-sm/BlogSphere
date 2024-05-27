import { BlogCard } from "../components/BlogCard"

export const Blogs=()=>{
    return <div>
        <BlogCard
            authorName={"sourav"}
            title={"titleof blog"}
            content={"content of blog"}
            publishedDate={"21st nov 2002"}
        />
    </div>
}