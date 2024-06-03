import { useState,useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";

interface Blog{
    "author":{
        "name":string
    },
    "title":string,
    "content":string,
    "id":number
}

export const useBlogs=()=>{
    const[loading,setLoading]=useState(true);
    const[blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bluk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data),
            setLoading(false)
        })
    },[])

    return{
        loading,
        blogs
    }
}