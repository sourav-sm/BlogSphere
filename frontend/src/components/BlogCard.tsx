interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-200">

    </div>
}

function Avatar({ name }:{name:string}){
    return (
        <div className="relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
           <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
}:BlogCardProps)=>{
    return <div>
        <div className="flex">
            <div className="flex justify-center flex-col">
              <Avatar name={authorName}/>
            </div>
            <div className="font-extralight pl-2">
             {authorName}
            </div>
            <div className="font-extralight pl-2 justify-center flex-col">
                <Circle/>
            </div>
            <div className="pl-2 font-min text-slate-500">
             {publishedDate}
            </div>
        </div>
      <div>
        {title}
      </div>
      <div>
        {content.slice(0,100)+"..."}
      </div>
      <div>
        {`${Math.ceil(content.length/100)}`}
      </div>
      <div className="bg-slate-200 h-1 w-full">

      </div>
    </div>
}