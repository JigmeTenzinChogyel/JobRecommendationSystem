import { Outlet } from "react-router-dom";
import MainNav from "../navigation/MainNav";
import Footer from "../footer/Footer";

function MainLayout() {
    return (
        <main>
            <MainNav />
            <div>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default MainLayout;