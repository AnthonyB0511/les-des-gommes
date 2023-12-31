import { Routes, Route } from "react-router-dom"
import Home from "../../pages/Accueil/Home"
import { Ludotheque } from "../../pages/Ludotheque/Ludotheque";
import { Presentation } from "../../pages/Presentation/Presentation";
export default function Layout() {
    return (
        <div>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/presentation' exact element={<Presentation />} />
                <Route path="/ludotheque" exact element={<Ludotheque />} />
                <Route path="*">Not Found </Route>
            </Routes>
        </div>
    )
}