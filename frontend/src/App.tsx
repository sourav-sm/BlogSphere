import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { Home } from "./pages/Home";
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
      {/* for vercel analytics */}
      <Analytics/>
    </BrowserRouter>
  )
}

export default App
