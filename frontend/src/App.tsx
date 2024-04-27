import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Job from "./pages/Job";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from "./providers/AuthProvider";
import RequireAuth from "./auth/RequiredAuth";
import { ROLES } from "./constants";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            {/* Public Route */}
            <Route index element={<Home />} />
            <Route path="/job" element={<Job />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.SEEKER, ROLES.RECRUITER]}/>}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Page not found */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;