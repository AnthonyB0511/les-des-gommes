import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import AuthProvider from "./components/Authprovider/Authprovider";

function App() {
  const user = useLoaderData();
  console.log({ user });
  return (
    <>
      <AuthProvider>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
