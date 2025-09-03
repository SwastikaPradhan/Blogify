import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {Blogs} from './pages/Blogs'
import {Blog} from "./pages/Blog";
import {Publish} from "./pages/Publish"
import TextGenerator from './pages/GeneratewithAi';
import HeroPage from './components/HeroPage';



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
         <Route path="/" element={<HeroPage/>}/>
      <Route path ='/signup' element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/blog" element={<Blogs/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/publish" element={<Publish/>}/>  
      <Route path="/GenerateyourthoughtswithAI" element={<TextGenerator/>}/>  
      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App
