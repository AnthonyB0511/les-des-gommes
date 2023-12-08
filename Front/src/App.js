import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import AuthProvider from "./components/Authprovider/Authprovider";

function App() {
  const user = useLoaderData();
  return (
    <>
      <body>
        <AuthProvider>
          <header><Header /></header>

          <Suspense>
            <main>
              <Outlet />
            </main>

          </Suspense>
          <footer><Footer /></footer>

        </AuthProvider>
      </body>
    </>
  );
}

export default App;
