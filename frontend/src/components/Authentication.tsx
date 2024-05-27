import { ChangeEvent,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Authentication=({type}:{type:"signup" | "signin"})=>{
    const navigate=useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({//benefits of using signupInput so that it gives type safety like it will tell what backend need 
        name:"",
        username:"",
        password:""
    });

    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt= response.data
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }catch(e){
            //alert the user here that the request failed 
        }
    }
    
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div>
               <div className="text-4xl font-extrabold">
                    Create an account
                </div>
               <div className="text-lg font-medium text-slate-700 mb-4">
                  {type==='signin'?"Don't have an account?":"Already have an account?"} 
                   <Link className="pl-2 underline" to={type==="signin"? "/signup": "/signin"}>
                    {type==="signin"?"Sign Up":"Sign In"}
                </Link>
               </div>
            </div>
            <div>
               {type==="signup"?<LabelledInput label="Name" placeholder="Sourav Mohanta...." onChange={(e)=>{
                     setPostInputs({
                        ...postInputs,//it takes existing value of signup,name,password
                        name:e.target.value
                     })   
                }}
                />:null} 
                <LabelledInput label="UserName" placeholder="sourav@gmail.com" onChange={(e)=>{
                     setPostInputs({
                        ...postInputs,//it takes existing value of signup,name,password
                        name:e.target.value
                     })   
                }}
                />
                <LabelledInput label="Password" type={"password"} placeholder="12345689" onChange={(e)=>{
                     //"type={"password"}"-this will ensure that the password field is in this format ********
                     setPostInputs({
                        ...postInputs,//it takes existing value of signup,name,password
                        name:e.target.value
                     })   
                }}
                />
                <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"? "Sign up" : "Sign in"}</button>
            </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    type?: string
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
    <label className="block mb-2 text-base font-semibold text-black">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}