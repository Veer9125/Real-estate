import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/about"
import Profile from "./pages/Profile"
import SignIn from "./pages/signIn"
import SignUp from "./pages/signUp"
import Header from "./components/Header"

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
