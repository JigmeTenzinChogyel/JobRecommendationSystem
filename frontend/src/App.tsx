import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout"
import Home from "./pages/Home"
import Job from "./pages/Job"
import About from "./pages/About"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/job" element={<Job />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
