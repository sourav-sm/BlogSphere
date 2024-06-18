import { Link, useNavigate } from "react-router-dom";
import home from "../../src/Image/home.png"

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between border-b px-4 py-2 md:px-10 md:py-4">
                <div className="font-serif flex flex-col justify-center font-semibold text-2xl md:text-4xl text px-4 md:px-36">
                    BlogSphere
                </div>
                <div className="font-serif hidden space-x-2 md:space-x-5 px-4 md:px-28 text-sm md:text-md font-normal md:flex">
                    <Link to={("/signup")}> Write</Link>
                    <Link to={("/signin")}>Sign In</Link>
                    <Link to={("/signup")}>
                        <button className="bg-black text-white px-2 py-1 rounded-lg md:px-3 md:py-1">Get Started</button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row border-b-8 pt-8 md:pt-0">
                <div className="flex flex-col justify-center px-4 py-4 md:mx-20 md:py-2">
                    <div className="text-6xl font-semibold pt-8 md:pt-2 md:text-8xl">
                        Human
                    </div>
                    <div className="text-6xl font-semibold md:text-8xl">
                        stories & ideas
                    </div>
                    <div className="text-2xl font-semibold pt-6 md:pt-7">
                        A place to read, write, and deepen your understanding
                    </div>
                    <div className="text-lg font-normal pt-2 md:pt-7">
                        <button onClick={() => navigate("/signup")} className="bg-green-700 md:bg-black text-white px-4 py-2 mt-6 mb-6 rounded-2xl">
                            Start Reading
                        </button>
                    </div>
                </div>
                <div className="hidden md:flex md:ml-24">
                    <img src={home} alt="" />
                </div>
            </div>

            <div className="flex flex-col  bg-black text-white md:text-slate-500 md:bg-white">
                <div className="flex justify-center text-5xl pt-5 pb-10 font-semibold md:hidden">
                    BlogSphere
                </div>
               <div className="flex flex-wrap justify-center space-x-2 md:space-x-5 pt-2 pb-2 mt-15 md:mt-5 md:pb-5  text-white md:text-slate-500 md:pt-2"> 
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
                <div className="flex justify-center pb-7 md:pb-5">
                    All copy right reserved @2024
                </div>
            </div>
        </div>
    )
}