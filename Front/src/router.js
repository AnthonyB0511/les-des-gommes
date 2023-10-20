import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
import { userLoader } from "./loaders/userLoader";
const Home = lazy(() => import("./pages/Accueil/Home"));
const Presentation = lazy(() => import("./pages/Presentation/Presentation"));
const Ludotheque = lazy(() => import("./pages/Ludotheque/Ludotheque"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));
const Login = lazy(() => import("./pages/Login/Login"));
const LoginView = lazy(() => import("./pages/LoginView/LoginView"));
const Register = lazy(() => import("./pages/Register/Register"));

// const Admin = lazy(() => import("./pages/Admin/Admin"));


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,

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
            },
            {
                path: "/login",
                element: <Login />,
                children: [
                    {
                        path: "",
                        element: <LoginView />
                    },
                    {
                        path: "register",
                        element: <Register />
                    }
                ]
            }
        ]
    }
]);