import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
import { userLoader } from "./loaders/userLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


const Home = lazy(() => import("./pages/Accueil/Home"));
const Presentation = lazy(() => import("./pages/Presentation/Presentation"));
const Ludotheque = lazy(() => import("./pages/Ludotheque/Ludotheque"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));
const Login = lazy(() => import("./pages/Login/Login"));
const LoginView = lazy(() => import("./pages/LoginView/LoginView"));
const Register = lazy(() => import("./pages/Register/Register"));
const Discussion = lazy(() => import("./pages/Discussion/Discussion"));
const AdminPage = lazy(() => import("./pages/Admin/AdminPage"));
const Articles = lazy(() => import("./pages/Admin/component/Articles"));
const ModifCarrousel = lazy(() => import("./pages/Admin/component/ModifCarrousel"));
const AddGame = lazy(() => import("./pages/Admin/component/AddGame"));
const ForgotPassword = lazy(() => import("./pages/Security/ForgotPassword"));
const ConfirmAdressRegister = lazy(() => import("./pages/Register/ConfirmAdressRegister"));
const ResetPassword = lazy(() => import("./pages/Security/ResetPassword"));


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
                path: "/admin",
                element: <AdminPage />,
                children: [
                    {
                        path: "",
                        element: <Articles />
                    }, {
                        path: "ajoutJeu",
                        element: <AddGame />
                    }, {
                        path: "carrousel",
                        element: <ModifCarrousel />
                    }
                ]
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
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>)
            },
            {
                path: "/discussion",
                element: (
                    <ProtectedRoute>
                        <Discussion />
                    </ProtectedRoute>)
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
                        element: <ConfirmAdressRegister />
                    }
                ]
            }, {
                path: "formulaireinscription",
                element: <Register />

            }, {
                path: "/motdepasseoublie",
                element: <ForgotPassword />
            }, {
                path: "/modifiermdp",
                element: <ResetPassword />
            },
        ]
    }
]);