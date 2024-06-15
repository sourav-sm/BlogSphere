import { Link, useNavigate} from "react-router-dom";
import home from "../../src/Image/home.png"

export const Home=()=>{
    const navigate=useNavigate();
    return( <div>
            <div className="flex justify-between border-b px-10 py-4">
               <div className="font-serif flex flex-col justify-center font-semibold text-4xl text px-36">
                   Medium
               </div>
                <div className="font-serif flex space-x-5 px-28 text-md font-normal">

                    <Link to={("/signup")}> Write</Link>
                    <Link to={("/signin")}>Sign In</Link>
                    <Link to={("/signup")}>
                        <button className="bg-black text-white px-3 py-1 rounded-lg">Get Started</button> 
                    </Link>
              </div>           
            </div>

            <div className="flex border-b">
             <div className="flex flex-col justify-center  px-10 py-10">
                   <div className="px-28 text-8xl font-semibold pt-14"> 
                       Human 
                   </div>
                   <div className="px-28 text-8xl font-semibold">
                       stories & ideas
                   </div>
                   <div className="px-28 text-xl font-semibold pt-7">
                       A place to read,write,and deepen your understanding
                   </div>
                   <div className="px-28 text-xl font-normal pt-7">
                        <button onClick={()=>navigate("/signup")} className="bg-black text-white px-6 py-2 rounded-2xl">Start Reading</button>
                   </div>
               </div>
               <div className="vissible">
                   <img src={home} alt="" />
               </div>
             </div>

            <div className="flex justify-center space-x-5 pt-5 pb-5 text-slate-500">
                <div>Help</div>
                <div>Status</div>
                <div>About</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Blog</div>
                <div>Privacy</div>
                <div>Term</div>
                <div>Text to speech</div>
                <div>Teams</div>
            </div>
        </div>
    )
}