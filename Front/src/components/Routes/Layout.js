import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../../pages/Accueil/Home";
import Ludotheque from "../../pages/Ludotheque/Ludotheque";
import Presentation from "../../pages/Presentation/Presentation";
import Profile from "../../pages/Profile/Profile";
export default function Layout() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/presentation' exact element={<Presentation />} />
                <Route path="/ludotheque" exact element={<Ludotheque />} />
                {/* <Route path="/profile" ><Profile user={user} /></Route> */}
                <Route path="profile" exact element={<Profile />} />
                <Route path="*">Not Found </Route>
            </Routes>
            <Footer />
        </div>
    );
}