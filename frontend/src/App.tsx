import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from "./providers/AuthProvider";
import RequireAuth from "./auth/RequiredAuth";
import { ROLES } from "./constants";
import Unauthorized from "./pages/Unauthorized";
import Employer from "./pages/Employer";
import FAQComponent from "./pages/FAQ";
import Notification from "./pages/Notification";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            {/* Conditional Route */}
            <Route index element={<Home />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQComponent />} />

            {/* Protected Route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.SEEKER, ROLES.RECRUITER]} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/notification" element={<Notification />} />
            </Route>

          </Route>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Page not found */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;