import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import { UserProvider } from "./components/provider/UserProvider";
import Profile from "./pages/Profile";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserProvider>
                <Home />
              </UserProvider>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProvider>
                <Profile />
              </UserProvider>
            </ProtectedRoute>
            } 
          />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
