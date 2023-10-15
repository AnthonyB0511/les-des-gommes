import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Accueil/Home";
import Presentation from "./pages/Presentation/Presentation";
import Ludotheque from "./pages/Ludotheque/Ludotheque";
import Contact from "./pages/Contact/Contact";
import Discussion from "./pages/Discussion/Discussion";
import Profile from "./pages/Profile/Profile";
import ErrorPage from "./pages/Error/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/presentation",
                element: <Presentation />
            },
            {
                path: "/ludotheque",
                element: <Ludotheque />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    }
]);